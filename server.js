const express = require('express')
const addr = require('./Module/Utility/address.cjs')

const app = express()

app.set('view engine', 'pug')
app.set('views', './View')

app.use(express.json())
app.use(express.urlencoded())
app.use(require('./Module/home.cjs'))
app.use(require('./Module/edit.cjs'))
app.use(require('./Module/create.cjs'))

app.listen(Number(addr.port), logPort)


function logPort() {
	console.log(`Listen on ${addr.address}:${addr.port}`)
}
