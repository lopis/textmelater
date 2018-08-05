const API_ENDPOINT = 'https://api.telegram.org/bot'
const fetch = require('node-fetch')
const FormData = require('form-data')

const {token, webHook} = require('../config/secrets')

function _get (method) {
  return fetch(`${API_ENDPOINT}${token}/${method}`)
}

function _post (method, params) {
  return fetch(`${API_ENDPOINT}${token}/${method}`, {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    body: params
  })
  .then(data => data.json())
  .then(data => {
    console.log(data)
    console.log(params)
  })
}

function _createFormData(data) {
  const formData = new FormData()
  Object.keys(key => formData.append(key, data[key]))

  return formData
}

function setWebhook () {
  return _get('setWebhook', webHook)
}

function getUpdates () {
  return _get('getUpdates')
}

function getInlineQueryUpdates () {
  return getUpdates()
    .then(data => data.json())
    .then(json => {
      if (json.ok) {
        const updates = json.result
        return updates.filter(update => update.inline_query)
      }
    })
}

function answerInlineQuery (update, results, options) {
  const data = {
    inline_query_id: `${update.update_id}`,
    results: JSON.stringify(results)
  }

  console.log(data.inline_query_id)

  _post('answerInlineQuery', data)
}

module.exports = {
  setWebhook,
  getInlineQueryUpdates,
  answerInlineQuery
}
