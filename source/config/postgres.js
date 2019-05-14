// Note: This is for local testing
// Once deployed, we don't want this in
// a public repo

const { Pool } = require('pg');
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'blimp',
  password: 'password',
  port: 5432,
})

const moment = require('moment');

const getDashboardByUrl = (request, response) => {
  const url = request.params.url
  console.log(url)
  pool.query('SELECT * FROM dashboard WHERE url = $1', [url], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })

}

const getDashboards = (request, response) => {
  pool.query('SELECT * FROM pg_catalog.pg_tables;', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// get dashboard information given dashboard id
const getDashboardById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM dashboard WHERE id = $1', [id], (error, results) => {
    if (error) throw error;
    response.status(200).json(results.rows);
  })
}

// create dashboard, update permissions table
const createDashboard = (request, response) => {
  const { name, userid } = request.body;
  url = name.replace(/\s+/g, '-').toLowerCase();
 
  pool.query('INSERT INTO dashboard (url, name, contents, public, last_saved, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', 
    [url, name, '{}', true, moment(Date.now()), moment(Date.now())], (error, results) => {
      if (error) throw error;
      dashboardid = results.rows[0].id;

      pool.query('INSERT INTO permissions (user_id, dashboard_id, role) VALUES ($1, $2, $3)', 
        [userid, dashboardid, 'owner'], (error, results) => {
          if (error) throw error;
      })
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
    response.status(200).json(results.rows);
  })
}

//create user
const createUser = (request, response) => {
  const {email, name, password} = request.body
 
  pool.query('INSERT INTO users (email, img_url, name, password) VALUES ($1, $2, $3, $4) RETURNING *', 
    [email, '', name, password], (error, results) => {
      if (error) throw error;
      response.status(200).json(results.rows);
  })
}

module.exports = {
  getDashboardById,
  getDashboardByUrl,
  getDashboards,
  createDashboard,
  deleteDashboard,
  createUser,
}
