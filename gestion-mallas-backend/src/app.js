const express = require("express");
const cors = require("cors");
const facultadRoutes = require("./routes/facultad.routes");
const carreraRoutes = require("./routes/carrera.routes");
const materiaRoutes = require("./routes/materia.routes");
const mallaRoutes = require('./routes/malla.routes')

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Gestión de Mallas - OK");
});

app.use("/api/facultades", facultadRoutes);
app.use("/api/carreras", carreraRoutes);
app.use("/api/materias", materiaRoutes);
app.use('/api/mallas', mallaRoutes)


module.exports = app;