import express from 'express'

import alunosRoutes from './routes/alunos.routes.js'

const app = express()

// Permite receber JSON no corpo das requisições
app.use(express.json())

// Rota inicial da API
app.get('/', (req, res) => {
  res.status(200).json({
    mensagem: 'API REST funcionando'
  })
})

// Todas as rotas de alunos começam com /alunos
app.use('/alunos', alunosRoutes)

export default app