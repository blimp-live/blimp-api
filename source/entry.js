const express = require('express')
const bodyParser = require('body-parser')
const pg = require('./config/postgres')
const whitelist = require('./config/whitelist');
const app = express()
const port = process.env.PORT || 8000;

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", whitelist.netlify);
  res.header("Access-Control-Allow-Origin", whitelist.prod);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.get('/', function (req, res) {
  res.send('Home Page')
})

app.get('/login', function(req, res) {
  res.send('Login Page')
})

//curl http://localhost:8000/dashboard
app.get('/dashboard', pg.getDashboards)

//curl http://localhost:8000/dashboard/id/0
app.get('/dashboard/id/:id', pg.getDashboardById)

//curl http://localhost:8000/dashboard/url/url
app.get('/dashboard/url/:url', pg.getDashboardByUrl)

//curl --data "name=Riley's Dashboard" --data userid=1 http://localhost:8000/dashboard
app.post('/dashboard', pg.createDashboard)

// curl -X "PUT" --data "name=Riley" --data contents='{}' http://localhost:8000/dashboard/id/0
app.put('/dashboard/id/:id', pg.setDashboard)

// curl -X "DELETE" --data userid=1 http://localhost:8000/dashboard/id/0
app.delete('/dashboard/id/:id', pg.deleteDashboard)

// curl --data "email=rgowanlock@gmail.com&name=Riley&password=" http://localhost:8000/user
app.post('/user', pg.createUser)

// curl -X "DELETE" --data userid=1 http://localhost:8000/user
app.delete('/user', pg.deleteUser)

app.get('/user', pg.getUser)

app.get('/user/:id', pg.getUserById)

app.post('/user/role/:role', pg.updateUserRole)

app.listen(port, () => console.log(`Blimp app listening on port ${port}!`))
