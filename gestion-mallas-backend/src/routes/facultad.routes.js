// src/routes/facultad.routes.js
const express = require('express')
const {
  getFacultades,
  getFacultadById,
  createFacultad,
  updateFacultad,
  deleteFacultad
} = require('../controllers/facultad.controller')

const router = express.Router()

router.get('/', getFacultades)
router.get('/:id', getFacultadById)
router.post('/', createFacultad)
router.put('/:id', updateFacultad)
router.delete('/:id', deleteFacultad)

module.exports = router
