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

const getDashboardById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM dashboard WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.log(error);
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getDashboardById,
  getDashboardByUrl,
  getDashboards,
}
