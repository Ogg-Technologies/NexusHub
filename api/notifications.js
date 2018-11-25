const Endpoint = cubic.nodes.api.core.Endpoint

class Notification extends Endpoint {
  constructor (api, db, url) {
    super(api, db, url)
    this.schema.method = 'POST'
    this.schema.scope = 'write_notifications_global'
    this.schema.description = 'Endpoint which pushes notifications to the web-client.'
    this.schema.request = {
      body: {
        game: 'warframe',
        message: {
          title: 'Example Notification',
          body: 'This is where something important happens.'
        }
      }
    }
    this.schema.response = {
      game: String,
      message: {
        title: String,
        body: String
      }
    }
    this.schema.pubsub = {
      url: '/notifications',
      response: this.schema.response
    }
  }

  async main (req, res) {
    await this.publish(req.body)
    res.send(req.body)
  }
}

module.exports = Notification
