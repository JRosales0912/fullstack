const http = require('http')
const app = require('./app')
const conf = require('./utils/config')
const log = require('./utils/logger')
const server = http.createServer(app)

server.listen(conf.PORT, () => {
  log.info(`Server running on port ${conf.PORT}`)
})