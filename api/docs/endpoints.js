const Endpoint = cubic.nodes.api.core.Endpoint
const path = require('path')
const fs = require('fs')
const endpoints = []
const replacer = (key, value) => {
  // if we get a function, give us the code for that function
  if (typeof value === 'function') {
    return value.toString()
  }
  return value
}

// Ensure there are Endpoint classes for each node
if (!cubic.nodes.warframe) {
  cubic.nodes.warframe = { core: { Endpoint } }
}

function getEndpointTree (filepath) {
  let stats = fs.lstatSync(filepath)

  // Don't include this endpoint
  if (filepath.includes('docs/endpoints')) {
    return
  }

  // Folder
  if (stats.isDirectory()) {
    fs.readdirSync(filepath).map(child => {
      return getEndpointTree(filepath + '/' + child)
    })
  }

  // File -> Set endpoint config
  else {
    let Endpoint = require(filepath.replace('//', '/'))
    let endpoint = new Endpoint().schema
    if (!endpoint) {
      return
    }

    // Routes
    endpoint.name = path.basename(filepath).replace('.js', '')
    let route = path.resolve(filepath).replace(path.resolve(cubic.config.main.core.endpointPath), '')
      .replace(/\\/g, '/').replace('.js', '')
    endpoint.sourceUrl = `https://github.com/nexus-devs/nexus-stats/blob/development/api${route}.js`
    endpoint.route = endpoint.url ? endpoint.url : route
    endpoints.push(endpoint)
  }
}
getEndpointTree(path.resolve(__dirname, '../'))

class Endpoints extends Endpoint {
  constructor (api, db, url) {
    super(api, db, url)
    this.schema.description = 'Returns schema for all API endpoints.'
    this.schema.response = {}
  }

  async main (req, res) {
    const data = JSON.stringify(endpoints, replacer)
    this.cache(data)
    res.send(data, 60)
  }
}

module.exports = Endpoints
