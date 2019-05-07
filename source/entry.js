const express = require('express')
const app = express()
const port = 3000

app.get('/', function (req, res) {
  res.send('Home Page')
})

// NOTE: if you wanted to direct to a specific function instead can do
// app.get('/blah', functionname)
app.get('/login', function(req, res) {
  res.send('Login Page')
})

// NOTE: Put all other routes above this one
// This will catch everything else
app.get('/*', function(req, res) {
  res.send('This would be some dashboard')
})



app.listen(port, () => console.log(`Blimp app listening on port ${port}!`))
