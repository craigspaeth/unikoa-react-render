/* eslint-env mocha */
const unikoaReactRender = require('./')

describe('on the server', () => {
  it('foos', () => {
    console.log(unikoaReactRender)
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
