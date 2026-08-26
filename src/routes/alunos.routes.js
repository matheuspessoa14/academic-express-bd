import { Router } from 'express'

import alunoController from '../controllers/AlunoController.js'

const router = Router()

// POST /alunos
router.post(
  '/',
  alunoController.store.bind(alunoController)
)

// GET /alunos
router.get(
  '/',
  alunoController.index.bind(alunoController)
)

// GET /alunos/:id
router.get(
  '/:id',
  alunoController.show.bind(alunoController)
)

// PUT /alunos/:id
router.put(
  '/:id',
  alunoController.update.bind(alunoController)
)

// DELETE /alunos/:id
router.delete(
  '/:id',
  alunoController.delete.bind(alunoController)
)

export default router