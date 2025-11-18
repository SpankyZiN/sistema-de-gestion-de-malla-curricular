const express = require('express')
const cors = require('cors')
const facultadRoutes = require('./routes/facultad.routes')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API Gestión de Mallas - OK')
})

app.use('/api/facultades', facultadRoutes)

module.exports = app
