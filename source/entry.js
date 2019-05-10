const express = require('express')
const pg = require('./config/postgres')
const app = express()
const port = 3000

app.get('/', function (req, res) {
  res.send('Home Page')
})

app.get('/login', function(req, res) {
  res.send('Login Page')
})

app.get('/dashboard/id/:id', pg.getDashboardById)

app.get('/dashboard/url/:url', pg.getDashboardByUrl)

app.listen(port, () => console.log(`Blimp app listening on port ${port}!`))
