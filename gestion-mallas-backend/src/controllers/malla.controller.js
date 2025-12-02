const { pool } = require('../db')

// Normaliza el campo "materias" para que siempre sea un array de objetos válido
function normalizarMaterias(materias) {
  // Sin materias => array vacío
  if (!materias) return []

  // Si ya es array
  if (Array.isArray(materias)) {
    return materias
      .filter((m) => m && typeof m === 'object')
      .map((m) => ({
        nombre: String(m.nombre || '').trim(),
        prerrequisito: String(m.prerrequisito || '').trim()
      }))
  }

  // Si viene como string (JSON en texto)
  if (typeof materias === 'string') {
    try {
      const parsed = JSON.parse(materias)
      if (Array.isArray(parsed)) {
        return parsed
          .filter((m) => m && typeof m === 'object')
          .map((m) => ({
            nombre: String(m.nombre || '').trim(),
            prerrequisito: String(m.prerrequisito || '').trim()
          }))
      }
    } catch (e) {
      console.error('Error parseando materias:', e)
    }
  }

  // Fallback
  return []
}

async function getMallas(req, res) {
  try {
    const result = await pool.query(`
      SELECT
        m.id,
        m.cohorte,
        m.descripcion,
        m.materias,
        c.id AS carrera_id,
        c.nombre AS carrera_nombre
      FROM malla m
      JOIN carrera c ON c.id = m.carrera_id
      ORDER BY m.cohorte DESC, m.id
    `)
    res.json(result.rows)
  } catch (error) {
    console.error('Error al obtener mallas:', error)
    res.status(500).json({ message: 'Error al obtener mallas' })
  }
}

async function getMallaById(req, res) {
  const { id } = req.params
  try {
    const result = await pool.query(
      `
      SELECT
        m.id,
        m.cohorte,
        m.descripcion,
        m.materias,
        m.carrera_id,
        c.nombre AS carrera_nombre
      FROM malla m
      JOIN carrera c ON c.id = m.carrera_id
      WHERE m.id = $1
      `,
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Malla no encontrada' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Error al obtener malla:', error)
    res.status(500).json({ message: 'Error al obtener malla' })
  }
}

async function createMalla(req, res) {
  try {
    const { carrera_id, cohorte, descripcion, materias } = req.body

    if (!carrera_id || !cohorte) {
      return res
        .status(400)
        .json({ message: 'Carrera y cohorte son obligatorios' })
    }

    if (cohorte <= 0) {
      return res
        .status(400)
        .json({ message: 'El cohorte debe ser un año válido mayor a 0' })
    }

    // Normalizamos y serializamos nosotros
    const materiasArray = normalizarMaterias(materias)
    const materiasJson = JSON.stringify(materiasArray)

    const result = await pool.query(
      `
      INSERT INTO malla (carrera_id, cohorte, descripcion, materias)
      VALUES ($1, $2, $3, $4::jsonb)
      RETURNING *
      `,
      [carrera_id, cohorte, descripcion || null, materiasJson]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Error al crear malla:', error)
    res.status(500).json({ message: 'Error al crear malla' })
  }
}

async function updateMalla(req, res) {
  const { id } = req.params
  try {
    const { carrera_id, cohorte, descripcion, materias } = req.body

    if (!carrera_id || !cohorte) {
      return res
        .status(400)
        .json({ message: 'Carrera y cohorte son obligatorios' })
    }

    if (cohorte <= 0) {
      return res
        .status(400)
        .json({ message: 'El cohorte debe ser un año válido mayor a 0' })
    }

    const materiasArray = normalizarMaterias(materias)
    const materiasJson = JSON.stringify(materiasArray)

    const result = await pool.query(
      `
      UPDATE malla
      SET carrera_id = $1,
          cohorte = $2,
          descripcion = $3,
          materias = $4::jsonb,
          updated_at = NOW()
      WHERE id = $5
      RETURNING *
      `,
      [carrera_id, cohorte, descripcion || null, materiasJson, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Malla no encontrada' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Error al actualizar malla:', error)
    res.status(500).json({ message: 'Error al actualizar malla' })
  }
}

async function deleteMalla(req, res) {
  const { id } = req.params
  try {
    const result = await pool.query(
      'DELETE FROM malla WHERE id = $1 RETURNING id',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Malla no encontrada' })
    }

    res.json({ message: 'Malla eliminada correctamente' })
  } catch (error) {
    console.error('Error al eliminar malla:', error)
    res.status(500).json({ message: 'Error al eliminar malla' })
  }
}

module.exports = {
  getMallas,
  getMallaById,
  createMalla,
  updateMalla,
  deleteMalla
}
