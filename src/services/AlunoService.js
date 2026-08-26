import alunoRepository from '../repositories/AlunoRepository.js'

// Service concentra as regras de negócio da aplicação
class AlunoService {

  async findAll() {
    return alunoRepository.findAll()
  }

  async findById(id) {
    return alunoRepository.findById(id)
  }

  async create({ nome, curso }) {

    // Regra de negócio: nome e curso são obrigatórios
    if (!nome || !nome.trim()) {
      throw new Error('O nome do aluno é obrigatório')
    }

    if (!curso || !curso.trim()) {
      throw new Error('O curso do aluno é obrigatório')
    }

    // Só chega ao banco depois da validação
    return alunoRepository.create({
      nome: nome.trim(),
      curso: curso.trim()
    })
  }

  async update(id, { nome, curso }) {

    // A mesma regra também vale para atualização
    if (!nome || !nome.trim()) {
      throw new Error('O nome do aluno é obrigatório')
    }

    if (!curso || !curso.trim()) {
      throw new Error('O curso do aluno é obrigatório')
    }

    return alunoRepository.update(id, {
      nome: nome.trim(),
      curso: curso.trim()
    })
  }

  async delete(id) {
    return alunoRepository.delete(id)
  }
}

export default new AlunoService()