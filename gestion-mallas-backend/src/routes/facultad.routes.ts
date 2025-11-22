import express from 'express';
import {
  createFacultad,
  deleteFacultad,
  getFacultadById,
  getFacultades,
  updateFacultad,
} from '../controllers/facultad.controller';

const router = express.Router();

router.get('/', getFacultades);
router.get('/:id', getFacultadById);
router.post('/', createFacultad);
router.put('/:id', updateFacultad);
router.delete('/:id', deleteFacultad);

export default router;
