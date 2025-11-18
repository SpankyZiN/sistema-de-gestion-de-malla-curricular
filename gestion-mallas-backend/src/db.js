// src/db.js
const { Pool } = require('pg')
require('dotenv').config()

// Opción 1: usando DATABASE_URL (recomendado para Vercel)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

// Opción 2 (si no usás URL, descomentá esto y comentá lo de arriba)
/*
const pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  port: process.env.PGPORT || 5432,
  user: process.env.PGUSER || 'tu_usuario',
  password: process.env.PGPASSWORD || 'tu_password',
  database: process.env.PGDATABASE || 'gestion_mallas'
})
*/

module.exports = { pool }
