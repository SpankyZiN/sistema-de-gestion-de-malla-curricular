// src/app.js
const express = require('express')
const cors = require('cors')
const facultadRoutes = require('./routes/facultad.routes')

const app = express()

app.use(cors())
app.use(express.json())

// Endpoint simple para probar que la API responde
app.get('/', (req, res) => {
  res.send('API Gestión de Mallas - OK')
})

// Rutas del módulo Facultad
app.use('/api/facultades', facultadRoutes)

module.exports = app
