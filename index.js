const React = require('react')
const { render } = require('react-dom')
const { renderToString } = require('react-dom/server')

const { html, body, div, script } = React.DOM
const ID = 'unikoa-react-render-body'

module.exports = (options) =>
  (ctx, next) => {
    ctx.render = (locals) => {
      const opts = Object.assign({}, options, locals)

      // On the server compose the head, body, and scripts into a full page
      if (typeof window === 'undefined') {
        const renderBody = process.env.UNIKOA_RENDER_SERVER !== 'false'
        ctx.body = renderToString(
          html({},
            React.createElement(opts.head, null),
            body({},
              div({ id: ID },
                renderBody && React.createElement(opts.body, null)),
            opts.scripts && typeof opts.scripts[0] === 'string'
              ? opts.scripts.map((src) => script({ src }))
              : opts.scripts))
        )

      // On the client render just the body inside the server-rendered part
      } else {
        const Component = React.createClass({
          componentDidMount () {
            if (opts.subscribe) opts.subscribe(() => this.forceUpdate())
          },
          render () {
            return React.createElement(opts.body, null)
          }
        })
        render(
          React.createElement(Component, null),
          document.getElementById(ID)
        )
      }
    }
  }
