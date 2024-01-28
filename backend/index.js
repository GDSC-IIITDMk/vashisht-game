const express = require('express')
const app = express()

app.post('/', function (req, res) {
  res.send('Hello Woarld post')
})
app.get('/', function (req, res) {
    res.send('Hello Woarld get')
  })
app.listen(5000)