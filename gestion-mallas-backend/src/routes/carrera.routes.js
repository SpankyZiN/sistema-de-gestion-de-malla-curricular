const express = require('express')
const {
  getCarreras,
  getCarreraById,
  createCarrera,
  updateCarrera,
  deleteCarrera
} = require('../controllers/carrera.controller')

const router = express.Router()

router.get('/', getCarreras)
router.get('/:id', getCarreraById)
router.post('/', createCarrera)
router.put('/:id', updateCarrera)
router.delete('/:id', deleteCarrera)

module.exports = router
