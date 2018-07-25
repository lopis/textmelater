const API_ENDPOINT = 'https://api.telegram.org/bot'
const fetch = require('node-fetch')

const {token, webHook} = require('../config/secrets')

function get (method) {
  return fetch(`${API_ENDPOINT}${token}/${method}`)
}

function setWebhook () {
  get('setWebhook', webHook)
}

module.exports = {get, setWebhook}
