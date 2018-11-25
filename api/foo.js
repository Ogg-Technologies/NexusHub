const Endpoint = cubic.nodes.api.core.Endpoint

class Foo extends Endpoint {
  constructor (api, db, url) {
    super(api, db, url)
    this.schema.description = "Simple testing method which returns 'bar'."
    this.schema.response = String
  }

  async main (req, res) {
    res.send('bar')
  }
}

module.exports = Foo
