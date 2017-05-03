'use strict'

var runTests = require('./pg.common.js')
var helper = require('../../lib/agent_helper')

// We only run this for 0.10 because 0.8 doesn't build pg-3 native, and 0.12+ has strange
// issues with TAP. Once a new test harness is used, 0.12+ should be included in this
// test.
var semver = require('semver')
if (!semver.satisfies(process.versions.node, '0.10.x')) return

var agent = helper.instrumentMockedAgent(null, {
  transaction_tracer: {
    record_sql: 'raw'
  },
  slow_sql: {
    enabled: true
  }
})

// setting env var for forcing native
process.env.NODE_PG_FORCE_NATIVE = true

var pg = require('pg')

delete process.env.NODE_PG_FORCE_NATIVE

runTests(agent, pg, 'forced native')
