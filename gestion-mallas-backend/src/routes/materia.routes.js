const express = require("express");
const {
  getMaterias,
  getMateriaById,
  createMateria,
  updateMateria,
  deleteMateria,
} = require("../controllers/materia.controller");

const router = express.Router();

router.get("/", getMaterias);
router.get("/:id", getMateriaById);
router.post("/", createMateria);
router.put("/:id", updateMateria);
router.delete("/:id", deleteMateria);

module.exports = router;
