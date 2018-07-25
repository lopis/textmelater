const express = require('express')
const app = express()

function status (req, res) {
  res.send({
    status: 'wip'
  })
}

function init () {
  app.get('/status', status)

  app.listen(3001, function () {
  console.log('@textmelaterbot is ready and listening on port ' + 3001)
})
}

module.exports = {init}
