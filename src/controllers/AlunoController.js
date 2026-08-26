import alunoService from '../services/AlunoService.js'

// Controller é responsável pela comunicação HTTP
class AlunoController {

  // GET /alunos
  async index(req, res) {
    const alunos = await alunoService.findAll()

    return res.status(200).json(alunos)
  }

  // GET /alunos/:id
  async show(req, res) {
    const id = Number(req.params.id)

    const aluno = await alunoService.findById(id)

    if (!aluno) {
      return res.status(404).json({
        mensagem: 'Aluno não encontrado'
      })
    }

    return res.status(200).json(aluno)
  }

  // POST /alunos
  async store(req, res) {
    try {
      const { nome, curso } = req.body

      const aluno = await alunoService.create({
        nome,
        curso
      })

      return res
        .location(`/alunos/${aluno.id}`)
        .status(201)
        .json(aluno)

    } catch (error) {
      // Erros de regra de negócio retornam 400
      return res.status(400).json({
        mensagem: error.message
      })
    }
  }

  // PUT /alunos/:id
  async update(req, res) {
    try {
      const id = Number(req.params.id)

      const { nome, curso } = req.body

      const aluno = await alunoService.update(id, {
        nome,
        curso
      })

      if (!aluno) {
        return res.status(404).json({
          mensagem: 'Aluno não encontrado'
        })
      }

      return res.status(200).json(aluno)

    } catch (error) {
      return res.status(400).json({
        mensagem: error.message
      })
    }
  }

  // DELETE /alunos/:id
  async delete(req, res) {
    const id = Number(req.params.id)

    const removido = await alunoService.delete(id)

    if (!removido) {
      return res.status(404).json({
        mensagem: 'Aluno não encontrado'
      })
    }

    return res.status(204).send()
  }
}

export default new AlunoController()