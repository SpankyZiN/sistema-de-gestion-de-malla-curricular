const { pool } = require("../db");

async function getMaterias(req, res) {
  try {
    const result = await pool.query(
      `
      SELECT m.id, m.codigo, m.nombre, m.estado, m.carrera_id,
             c.nombre AS carrera_nombre
      FROM materia m
      INNER JOIN carrera c ON c.id = m.carrera_id
      WHERE m.estado != $1 OR m.estado IS NULL
      ORDER BY m.id
    `,
      ["INACTIVA"],
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener materias:", error);
    res.status(500).json({ message: "Error al obtener materias" });
  }
}

async function getMateriaById(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT id, codigo, nombre, estado, carrera_id
       FROM materia WHERE id = $1`,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Materia no encontrada" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al obtener materia:", error);
    res.status(500).json({ message: "Error al obtener materia" });
  }
}

async function createMateria(req, res) {
  const { codigo, nombre, estado = "ACTIVA", carrera_id } = req.body;

  if (!codigo || !nombre || !carrera_id) {
    return res
      .status(400)
      .json({ message: "Código, nombre y carrera son obligatorios" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO materia (codigo, nombre, estado, carrera_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id, codigo, nombre, estado, carrera_id`,
      [codigo, nombre, estado, carrera_id],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error al crear materia:", error);

    if (error.code === "23505") {
      // Código de error de duplicado (ej. código ya existe)
      return res
        .status(400)
        .json({ message: "El código de materia ya existe" });
    }

    if (error.code === "23503") {
      // Código de error de llave foránea (carrera_id no existe)
      return res.status(400).json({ message: "La carrera indicada no existe" });
    }

    res.status(500).json({ message: "Error al crear materia" });
  }
}

async function updateMateria(req, res) {
  const { id } = req.params;
  const { codigo, nombre, estado, carrera_id } = req.body;

  if (!codigo || !nombre || !carrera_id) {
    return res
      .status(400)
      .json({ message: "Código, nombre y carrera son obligatorios" });
  }

  try {
    const result = await pool.query(
      `UPDATE materia
       SET codigo = $1,
           nombre = $2,
           estado = $3,
           carrera_id = $4,
           updated_at = NOW()
       WHERE id = $5
       RETURNING id, codigo, nombre, estado, carrera_id`,
      [codigo, nombre, estado || "ACTIVA", carrera_id, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Materia no encontrada" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al actualizar materia:", error);
    res.status(500).json({ message: "Error al actualizar materia" });
  }
}

async function deleteMateria(req, res) {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM materia WHERE id = $1 RETURNING id",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Materia no encontrada" });
    }

    res.json({ message: "Materia eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar materia:", error);
    res.status(500).json({ message: "Error al eliminar materia" });
  }
}

module.exports = {
  getMaterias,
  getMateriaById,
  createMateria,
  updateMateria,
  deleteMateria,
};
