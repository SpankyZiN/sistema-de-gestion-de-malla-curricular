const { pool } = require('../db')

// GET /api/carreras
async function getCarreras(req, res) {
  try {
    const result = await pool.query(`
      SELECT c.id, c.codigo, c.nombre, c.estado, c.facultad_id,
             f.nombre AS facultad_nombre
      FROM carrera c
      INNER JOIN facultad f ON f.id = c.facultad_id
      ORDER BY c.id
    `)
    res.json(result.rows)
  } catch (error) {
    console.error('Error al obtener carreras:', error)
    res.status(500).json({ message: 'Error al obtener carreras' })
  }
}

// GET /api/carreras/:id
async function getCarreraById(req, res) {
  const { id } = req.params
  try {
    const result = await pool.query(
      `SELECT id, codigo, nombre, estado, facultad_id
       FROM carrera WHERE id = $1`,
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Carrera no encontrada' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Error al obtener carrera:', error)
    res.status(500).json({ message: 'Error al obtener carrera' })
  }
}

// POST /api/carreras
async function createCarrera(req, res) {
  const { codigo, nombre, estado = 'ACTIVA', facultad_id } = req.body

  if (!codigo || !nombre || !facultad_id) {
    return res.status(400).json({ message: 'Código, nombre y facultad son obligatorios' })
  }

  try {
    const result = await pool.query(
      `INSERT INTO carrera (codigo, nombre, estado, facultad_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id, codigo, nombre, estado, facultad_id`,
      [codigo, nombre, estado, facultad_id]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Error al crear carrera:', error)

    if (error.code === '23505') {
      return res.status(400).json({ message: 'El código de carrera ya existe' })
    }

    if (error.code === '23503') {
      return res.status(400).json({ message: 'La facultad indicada no existe' })
    }

    res.status(500).json({ message: 'Error al crear carrera' })
  }
}

// PUT /api/carreras/:id
async function updateCarrera(req, res) {
  const { id } = req.params
  const { codigo, nombre, estado = 'ACTIVA', facultad_id } = req.body

  if (!codigo || !nombre || !facultad_id) {
    return res.status(400).json({ message: 'Código, nombre y facultad son obligatorios' })
  }

  try {
    const result = await pool.query(
      `UPDATE carrera
       SET codigo = $1,
           nombre = $2,
           estado = $3,
           facultad_id = $4,
           updated_at = NOW()
       WHERE id = $5
       RETURNING id, codigo, nombre, estado, facultad_id`,
      [codigo, nombre, estado, facultad_id, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Carrera no encontrada' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Error al actualizar carrera:', error)
    res.status(500).json({ message: 'Error al actualizar carrera' })
  }
}

// DELETE /api/carreras/:id
async function deleteCarrera(req, res) {
  const { id } = req.params

  try {
    const result = await pool.query(
      'DELETE FROM carrera WHERE id = $1 RETURNING id',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Carrera no encontrada' })
    }

    res.json({ message: 'Carrera eliminada correctamente' })
  } catch (error) {
    console.error('Error al eliminar carrera:', error)
    res.status(500).json({ message: 'Error al eliminar carrera' })
  }
}

module.exports = {
  getCarreras,
  getCarreraById,
  createCarrera,
  updateCarrera,
  deleteCarrera
}
