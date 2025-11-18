const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE
})

async function test() {
  try {
    const r = await pool.query('SELECT NOW()')
    console.log('Conectado a PostgreSQL:', r.rows[0])
  } catch (err) {
    console.error('Error:', err)
  } finally {
    pool.end()
  }
}

test()
