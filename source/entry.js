const express = require('express')
const bodyParser = require('body-parser')
const pg = require('./config/postgres')
const app = express()
const port = 8000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', function (req, res) {
  res.send('Home Page')
})

app.get('/login', function(req, res) {
  res.send('Login Page')
})

app.get('/dashboard', pg.getDashboards)

app.get('/dashboard/id/:id', pg.getDashboardById)

app.get('/dashboard/url/:url', pg.getDashboardByUrl)

//curl --data "name=Riley's Dashboard" --data userid=1 http://localhost:8000/dashboard
app.post('/dashboard', pg.createDashboard)

// curl -X "DELETE" --data userid=1 http://localhost:8000/dashboard/id/0
app.delete('/dashboard/id/:id', pg.deleteDashboard)

// curl --data "email=rgowanlock@gmail.com&name=Riley&password=" http://localhost:8000/user
app.post('/user', pg.createUser)

app.listen(port, () => console.log(`Blimp app listening on port ${port}!`))


/* ROUGH- REMOVE LATER
- dashboard
	+ post - dashboard/ | createDashboard()
	+ delete - dashboard/id/:id | deleteDashboardById()
	+ get - dashboard/id/:id | getDashboardById()
	+ put - dashboard/id/:id | updateDashboardById()

- user
	+ post - user/ | createUser()
	+ delete - user/id/:id | deleteUserById()
	+ get - user/id/:id | getUserById()
	+ put - user/id/:id | updateUserById()

	-- put endpoint for changing role given user and dashboard id

post - user/ <specify: Riley> -> create user with id = 1
post - dashboard/ <specify: Riley's Dashboard, userid=1> -> create dashboard with name, id = 1; update permissions table
post - dashboard/ <specify: Riley's Dashboard #2, userid=1> -> create dashboard with name, id = 2; update permissions table

get - dashboard/id/1 <specify: userid=1> -> get dashboard, get user role from permissions table

put - dashboard/id/1 <specify: userid=1, contents> 
*/





