const express = require('express')
const router = express.Router()
const {
  getMallas,
  getMallaById,
  createMalla,
  updateMalla,
  deleteMalla
} = require('../controllers/malla.controller')

router.get('/', getMallas)
router.get('/:id', getMallaById)
router.post('/', createMalla)
router.put('/:id', updateMalla)
// opcional
router.delete('/:id', deleteMalla)

module.exports = router
