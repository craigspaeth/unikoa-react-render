const Koa = require('koa')
const router = require('./router')

const app = new Koa()

app.use(async (ctx, next) => {
  try { await next() } catch (e) { ctx.body = e.stack }
})
app.use(require('koa-static')(__dirname))
app.use(router.routes())

app.listen(3000)
console.log('Listening')
