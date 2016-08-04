const unikoa = require('unikoa')
const unikoaReactRender = require('../')
const React = require('react')

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

router.get('/', (ctx, next) => next()) // TODO: Shouldn't need this?

router.use(unikoaReactRender({
  head: Head,
  body: Body,
  scripts: ['/bundle.js']
}))
