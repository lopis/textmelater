const express = require('express')
const app = express()

const telegram = require('./telegram')

function _status (req, res) {
  res.send({
    status: 'wip'
  })
}

function _getUpdates (req, res) {
  telegram.getInlineQueryUpdates()
    .then(updates => {
      res.send(updates)
    })
}

function init () {
  app.get('/status', _status)

  app.get('/updates', _getUpdates)

  app.listen(3001, function () {
  console.log('@textmelaterbot is ready and listening on port ' + 3001)
})
}

module.exports = {init}
