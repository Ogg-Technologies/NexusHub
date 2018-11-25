const prod = process.env.NODE_ENV === 'production'
const node = process.env.NEXUS_TARGET_NODE
const group = node ? node.split('-')[0] : null // auth-core, ui-core, etc, take first word before dash

// Use some adaptions when inside docker, especially database connections.
if (process.env.DOCKER && prod && group === 'auth') {
  const fs = require('fs')
  const certPrivate = fs.readFileSync(`/run/secrets/nexus-private-key`, 'utf-8')
  const certPublic = fs.readFileSync(`/run/secrets/nexus-public-key`, 'utf-8')
  const dbSecret = fs.readFileSync(`/run/secrets/mongo-admin-pwd`, 'utf-8').trim()
  const mongoUrl = `mongodb://admin:${dbSecret}@mongo/admin?replicaSet=nexus`
  const redisUrl = 'redis://redis'
  const config = {
    api: {
      redisUrl,
      certPublic
    },
    core: {
      mongoUrl,
      mongoDb: 'nexus-auth',
      redisUrl
    },
    certPrivate
  }
  if (prod) {
    const userKey = fs.readFileSync('/run/secrets/nexus-auth-key', 'utf-8').trim()
    const userSecret = fs.readFileSync('/run/secrets/nexus-auth-secret', 'utf-8').trim()
    config.core.apiUrl = 'ws://auth_api:3030/ws'
    config.core.authUrl = 'ws://auth_api:3030/ws'
    config.core.userKey = config.api.userKey = userKey
    config.core.userSecret = config.api.userSecret = userSecret
  }
  module.exports = config
}

// Normal environment should be fine with default config.
else {
  module.exports = {
    core: {
      mongoDb: 'nexus-auth'
    }
  }
}
