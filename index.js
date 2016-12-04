'use strict'

const monitor = require('vbb-monitor')

const stations = require('./stations')
console.info(stations.length, 'stations')
const interval = 60 * 1000

monitor(stations, interval)
.on('data', console.log)
.on('error', console.error)
