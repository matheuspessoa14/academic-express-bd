import pool from '../database/pool.js'

// Repository é responsável somente pela comunicação com o banco
class AlunoRepository {

  // Busca todos os alunos
  async findAll() {
    const [rows] = await pool.execute(
      'SELECT id, nome, curso FROM alunos ORDER BY id'
    )

    return rows
  }

  // Busca um aluno pelo ID
  async findById(id) {
    const [rows] = await pool.execute(
      'SELECT id, nome, curso FROM alunos WHERE id = ?',
      [id]
    )

    // Retorna o aluno ou null caso não exista
    return rows[0] ?? null
  }

  // Cria um novo aluno
  async create({ nome, curso }) {
    const [result] = await pool.execute(
      `
        INSERT INTO alunos (nome, curso)
        VALUES (?, ?)
      `,
      [nome, curso]
    )

    // insertId é o ID gerado automaticamente pelo MySQL
    return {
      id: result.insertId,
      nome,
      curso
    }
  }

  // Atualiza um aluno existente
  async update(id, { nome, curso }) {
    const [result] = await pool.execute(
      `
        UPDATE alunos
        SET nome = ?, curso = ?
        WHERE id = ?
      `,
      [nome, curso, id]
    )

    // Se nenhuma linha foi alterada, o aluno não existe
    if (result.affectedRows === 0) {
      return null
    }

    // Retorna o aluno já atualizado
    return this.findById(id)
  }

  // Exclui um aluno
  async delete(id) {
    const [result] = await pool.execute(
      'DELETE FROM alunos WHERE id = ?',
      [id]
    )

    // true = removido | false = não encontrado
    return result.affectedRows > 0
  }
}

export default new AlunoRepository()