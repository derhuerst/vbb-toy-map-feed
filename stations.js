'use strict'

const stations = require('vbb-stations')
const linesAt = require('vbb-lines-at')

module.exports = stations('all')
.filter((station) => {
	return (linesAt[station.id] || []).some((line) =>
		line.type === 'subway' || line.type === 'suburban')
})
.map((station) => station.id)
