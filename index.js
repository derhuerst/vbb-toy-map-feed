'use strict'

const websocket = require('ws')
const feed = require('./feed')

feed
.on('data', (departure) => {
	const data = JSON.stringify(departure)
	for (let client of server.clients) {
		if (client.readyState === websocket.OPEN) client.send(data)
	}
})
.on('error', console.error)

const server = websocket.createServer({port: 8080}, () => {})
