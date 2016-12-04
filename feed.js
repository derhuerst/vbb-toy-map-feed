'use strict'

const ttlBuffer = require('ttl-buffer')
const monitor = require('vbb-monitor')
const map = require('map-stream')

const stations = require('./stations')
const interval = 60 * 1000



const buffers = {} // by station + line
const bufferOf = (id) => {
	if (buffers[id]) return buffers[id]
	buffers[id] = ttlBuffer({
		ttl: 60 * 1000,
		initialValue: {sum: 0, entries: 0},
		in: ({sum, entries}, delay) => ({sum: sum + delay, entries: entries + 1}),
		out: ({sum, entries}, delay) => ({sum: sum - delay, entries: entries - 1})
	})
	return buffers[id]
}



module.exports = monitor(stations, interval)
	.pipe(map((departure, cb) => {
		const buffer = bufferOf(departure.station + '-' + departure.line)
		buffer.push(departure.delay || 0)

		const {sum, entries} = buffer.valueOf()
		departure.mean = sum / entries
		cb(null, departure)
	}))
