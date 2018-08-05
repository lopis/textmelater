const api = require('./api')
const telegram = require('./telegram')

const POLL_FREQUENCY = 1000
let queue = []
const history = []

function processQueue () {
  while (queue.length > 0) {
    console.log(`Processing ${queue.length} updates.`)
    const update = queue.shift() //pops the first element
    handleUpdate(update)
  }
  console.log(`Nothing to do; waiting.`)
  setTimeout(processQueue, POLL_FREQUENCY * 3)
}

function updateQueue () {
  telegram
    .getInlineQueryUpdates()
    .then(updates => {
      updates.forEach(update => {
        if (!history.includes(update.update_id)) {
          history.push(update.update_id)
          queue.push(update)
        }
      })
    })
}

function handleUpdate (update) {
  results = []
  results.push({
    type: 'article',
    id: Date.now(), // todo: do this in util
    title: 'Test Result',
    input_message_content: { // todo: do this in util
      message_text: 'This was a triumph',
      parse_mode: 'Markdown', // todo: do this in util
    }
  })

  telegram.answerInlineQuery(
    update,
    results
  )
}

api.init()
setInterval(updateQueue, POLL_FREQUENCY)
processQueue()
