// Note: This is for local testing
// Once deployed, we don't want this in
// a public repo
const whitelist = require('./whitelist');

const { Pool } = require('pg');
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'blimp',
  password: 'password',
  port: 5432,
})

const moment = require('moment');

function getUrlByName(name) {
  url = name.replace(/[^a-zA-Z 0-9]+/g, ''); //remove special char
  url = url.replace(/\s+/g, '-'); //replace space with hyphen
  url = '/' + url.toLowerCase();
  return url
}

const getDashboardByUrl = (request, response) => {
  const url = request.params.url

  pool.query('SELECT * FROM dashboard WHERE url = $1', [url], (error, results) => {
    if (error) throw error;
    response.header("Access-Control-Allow-Origin", whitelist.webDomain);
    response.status(200).json(results.rows)
  })
}

const getDashboards = (request, response) => {
  pool.query('SELECT * FROM pg_catalog.pg_tables;', (error, results) => {
    if (error) throw error;
    response.header("Access-Control-Allow-Origin", whitelist.webDomain);
    response.status(200).json(results.rows)
  })
}

// get dashboard information given dashboard id
const getDashboardById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM dashboard WHERE id = $1', [id], (error, results) => {
    if (error) throw error;
    response.header("Access-Control-Allow-Origin", whitelist.webDomain);
    response.status(200).json(results.rows);
  })
}

// create dashboard, update permissions table
const createDashboard = (request, response) => {
  const { name, userid } = request.body;

  url = getUrlByName(name)

  pool.query('INSERT INTO dashboard (url, name, contents, public, last_saved, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', 
    [url, name, '{}', true, moment(Date.now()), moment(Date.now())], (error, results) => {
      if (error) throw error;
      dashboardid = results.rows[0].id;

      pool.query('INSERT INTO permissions (user_id, dashboard_id, role) VALUES ($1, $2, $3)', 
        [userid, dashboardid, 'owner'], (error, results) => {
          if (error) throw error;
      })
      response.header("Access-Control-Allow-Origin", whitelist.webDomain);
      response.status(200).json(results.rows);
  })
}

//set dashboard
const setDashboard = (request, response) => {
  const dashboardid = parseInt(request.params.id)
  const {name, contents} = request.body

  url = getUrlByName(name)

  pool.query('UPDATE dashboard SET (url, name, contents, last_saved) = ($1, $2, $3, $4) WHERE id = $5 RETURNING *', 
    [url, name, contents, moment(Date.now()), dashboardid], (error, results) => {
      if (error) throw error;
      response.status(200).json(results.rows);
  })
}

//delete dashboard, update permissions table
const deleteDashboard = (request, response) => {
  const dashboardid = parseInt(request.params.id)
  const {userid} = request.body

  pool.query('DELETE FROM dashboard WHERE id = $1', [dashboardid], (error, results) => {
    if (error) throw error;
    pool.query('DELETE FROM permissions WHERE dashboard_id = $1', [dashboardid], (error, results) => {
      if (error) throw error;
    })
    response.header("Access-Control-Allow-Origin", whitelist.webDomain);
    response.status(200).json(results.rows);
  })
}

//create user
const createUser = (request, response) => {
  const {email, name, password} = request.body
 
  pool.query('INSERT INTO users (email, img_url, name, password) VALUES ($1, $2, $3, $4) RETURNING *', 
    [email, '', name, password], (error, results) => {
      if (error) throw error;
      response.header("Access-Control-Allow-Origin", whitelist.webDomain);
      response.status(200).json(results.rows);
  })
}

//delete user
const deleteUser = (request, response) => {
  const {userid} = request.body

  pool.query('DELETE FROM users WHERE id = $1', [userid], (error, results) => {
    if (error) throw error;
    pool.query('DELETE FROM permissions WHERE user_id = $1', [userid], (error, results) => {
      if (error) throw error;
    })
    response.header("Access-Control-Allow-Origin", whitelist.webDomain);
    response.status(200).json(results.rows);
  })
}

// get user
const getUser = (request, response) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) throw error;
    response.status(200).json(results.rows);
  })
}

// get user
const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) throw error;
    response.header("Access-Control-Allow-Origin", whitelist.webDomain);
    response.status(200).json(results.rows);
  })
}

// change user role
const updateUserRole = (request, response) => {}


module.exports = {
  getDashboardById,
  getDashboardByUrl,
  getDashboards,
  createDashboard,
  deleteDashboard,
  createUser,
  deleteUser,
  getUser,
  getUserById,
  updateUserRole,
  setDashboard,
}
