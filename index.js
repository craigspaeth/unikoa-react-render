const React = require('react')
const { render } = require('react-dom')
const { renderToString } = require('react-dom/server')

const { html, head, body, div, script } = React.DOM
const ID = 'unikoa-react-render-body'

module.exports = ({ head: Head, body: Body, scripts, subscribe }) =>
  (ctx, next) => {
    // On the server compose the head, body, and scripts into a full page
    if (typeof window === 'undefined') {
      const renderBody = process.env.UNIKOA_RENDER_SERVER !== 'false'
      ctx.body = renderToString(
        html({},
          head({}, Head),
          body({},
            div({ id: ID }, renderBody && React.createElement(Body, null)),
          typeof scripts[0] === 'string'
            ? scripts.map((src) => script({ src }))
            : scripts))
      )

    // On the client render just the body inside the server-rendered part
    } else {
      const Component = React.createClass({
        componentDidMount () {
          if (subscribe) subscribe(() => this.forceUpdate())
        },
        render () {
          return React.createElement(Body, null)
        }
      })
      render(React.createElement(Component, null), document.getElementById(ID))
    }
    next()
  }
