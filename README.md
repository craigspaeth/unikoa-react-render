# unikoa-react-render

**NOTE: This is a WIP and not production ready yet**

[Unikoa](https://github.com/craigspaeth/unikoa) middleware for rendering React apps universally

## Example

Create head and body components, and specify script tags, and Unikoa React Render will render those components on the server, then re-render the body on the client.

````javascript
const unikoa = require('unikoa')
const React = require('react')
const unikoaReactRender = require('unikoa-react-render')

const $ = React.DOM
const router = module.exports = unikoa()

const Head = React.createClass({
  render: function () {
    return $.title('Hello World')
  }
})

const Body = React.createClass({
  getInitialState: function () {
    return {secondsElapsed: 0}
  },
  tick: function () {
    this.setState({ secondsElapsed: this.state.secondsElapsed + 1 })
  },
  componentDidMount: function () {
    this.interval = setInterval(this.tick, 1000)
  },
  render: function () {
    return $.div({}, `Seconds Elapsed: ${this.state.secondsElapsed}`)
  }
})

// Load middleware with defaults configured
router.use(unikoaReactRender({
  head: Head,
  body: Body,
  scripts: ['/bundle.js'],
  subscribe: store.subscribe // Redux
}))

// Use ctx.render overidding defaults
router.get('/article/:id', (ctx, next) => {
  ctx.render({ body: Body })
})
````

## Contributing

Please fork the project and submit a pull request with tests. Install node modules `npm install` and run tests with `npm test`.

## License

MIT
