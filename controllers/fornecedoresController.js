const db = require('../database');

const fornecedoresController = {
  // Cadastrar um novo fornecedor
  cadastrarFornecedor: (req, res) => {
    const { nome, cnpj, endereco, telefone, email, contato } = req.body;

    // Verificar se todos os campos obrigatórios estão preenchidos
    if (!nome || !cnpj || !endereco || !telefone || !email || !contato) {
      return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser preenchidos!' });
    }

    // Inserir no banco de dados
    const sql = `
      INSERT INTO fornecedores (nome, cnpj, endereco, telefone, email, contato)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.run(sql, [nome, cnpj, endereco, telefone, email, contato], function (err) {
      if (err) {
        // Se o CNPJ já existir, o SQLite retorna um erro de unicidade
        if (err.code === 'SQLITE_CONSTRAINT') {
          return res.status(409).json({ mensagem: 'Fornecedor com esse CNPJ já está cadastrado!' });
        }
        return res.status(500).json({ mensagem: 'Erro ao cadastrar fornecedor', erro: err.message });
      }
      res.status(201).json({ mensagem: 'Fornecedor cadastrado com sucesso!', id: this.lastID });
    });
  },

  // Listar todos os fornecedores
  listarFornecedores: (req, res) => {
    const sql = 'SELECT * FROM fornecedores';
    db.all(sql, [], (err, rows) => {
      if (err) {
        return res.status(500).json({ mensagem: 'Erro ao listar fornecedores', erro: err.message });
      }
      res.status(200).json(rows);
    });
  },

  // Atualizar um fornecedor
  atualizarFornecedor: (req, res) => {
    const { id } = req.params;
    const { nome, cnpj, endereco, telefone, email, contato } = req.body;

    if (!nome || !cnpj || !endereco || !telefone || !email || !contato) {
      return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser preenchidos!' });
    }

    const sql = `
      UPDATE fornecedores
      SET nome = ?, cnpj = ?, endereco = ?, telefone = ?, email = ?, contato = ?
      WHERE id = ?
    `;
    db.run(sql, [nome, cnpj, endereco, telefone, email, contato, id], function (err) {
      if (err) {
        if (err.code === 'SQLITE_CONSTRAINT') {
          return res.status(409).json({ mensagem: 'CNPJ já está em uso por outro fornecedor!' });
        }
        return res.status(500).json({ mensagem: 'Erro ao atualizar fornecedor', erro: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ mensagem: 'Fornecedor não encontrado!' });
      }
      res.status(200).json({ mensagem: 'Fornecedor atualizado com sucesso!' });
    });
  },

  // Deletar um fornecedor
  deletarFornecedor: (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM fornecedores WHERE id = ?';
    db.run(sql, [id], function (err) {
      if (err) {
        return res.status(500).json({ mensagem: 'Erro ao deletar fornecedor', erro: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ mensagem: 'Fornecedor não encontrado!' });
      }
      res.status(200).json({ mensagem: 'Fornecedor deletado com sucesso!' });
    });
  }
};

module.exports = fornecedoresController;
