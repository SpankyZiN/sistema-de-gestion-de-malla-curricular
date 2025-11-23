const { pool } = require('../db')

async function getFacultades(req, res) {
  try {
    const result = await pool.query(
      'SELECT id, codigo, nombre, estado FROM facultad WHERE estado != $1 OR estado IS NULL ORDER BY id',
      ['INACTIVO'] 
    )
    res.json(result.rows)
  } catch (error) {
    console.error('Error al obtener facultades:', error)
    res.status(500).json({ message: 'Error al obtener facultades' })
  }
}

async function getFacultadById(req, res) {
  const { id } = req.params
  try {
    const result = await pool.query(
      'SELECT id, codigo, nombre, estado FROM facultad WHERE id = $1',
      [id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Facultad no encontrada' })
    }
    res.json(result.rows[0])
  } catch (error) {
    console.error('Error al obtener facultad:', error)
    res.status(500).json({ message: 'Error al obtener facultad' })
  }
}

async function createFacultad(req, res) {
  const { codigo, nombre, estado = 'ACTIVA' } = req.body

  if (!codigo || !nombre) {
    return res.status(400).json({ message: 'Código y nombre son obligatorios' })
  }

  try {
    const result = await pool.query(
      `INSERT INTO facultad (codigo, nombre, estado)
       VALUES ($1, $2, $3)
       RETURNING id, codigo, nombre, estado`,
      [codigo, nombre, estado]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Error al crear facultad:', error)

    if (error.code === '23505') { 
      return res.status(400).json({ message: 'El código de facultad ya existe' })
    }

    res.status(500).json({ message: 'Error al crear facultad' })
  }
}

async function updateFacultad(req, res) {
  const { id } = req.params
  const { codigo, nombre, estado } = req.body

  if (!codigo || !nombre) {
    return res.status(400).json({ message: 'Código y nombre son obligatorios' })
  }

  try {
    const result = await pool.query(
      `UPDATE facultad
       SET codigo = $1,
           nombre = $2,
           estado = $3,
           updated_at = NOW()
       WHERE id = $4
       RETURNING id, codigo, nombre, estado`,
      [codigo, nombre, estado || 'ACTIVA', id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Facultad no encontrada' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Error al actualizar facultad:', error)
    res.status(500).json({ message: 'Error al actualizar facultad' })
  }
}

async function deleteFacultad(req, res) {
  const { id } = req.params

  try {
    const result = await pool.query(
      'DELETE FROM facultad WHERE id = $1 RETURNING id',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Facultad no encontrada' })
    }

    res.json({ message: 'Facultad eliminada correctamente' })
  } catch (error) {
    console.error('Error al eliminar facultad:', error)
    res.status(500).json({ message: 'Error al eliminar facultad' })
  }
}

module.exports = {
  getFacultades,
  getFacultadById,
  createFacultad,
  updateFacultad,
  deleteFacultad
}
