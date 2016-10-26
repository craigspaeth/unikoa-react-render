/* eslint-env mocha */
const unikoaReactRender = require('./')
const React = require('react')

const $ = React.DOM

describe('on the server', () => {
  it('renders a head element', () => {
    const ctx = {}
    unikoaReactRender({
      head: () => $.title({}, 'Hello World'),
      body: () => $.div()
    })(ctx, () => {})
    ctx.render()
    ctx.body.should.containEql('Hello World')
  })
  it('does not call next', () => {

  })
})

describe('on the client', () => {
  beforeEach(() => {
    global.window = {}
  })

  afterEach(() => {
    delete global.window
  })

  it('bars', () => {
    console.log(unikoaReactRender)
  })
})
