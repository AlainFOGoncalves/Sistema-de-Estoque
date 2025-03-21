const db = require('../database');

const produtosController = {
  // Cadastrar um novo produto
  cadastrarProduto: (req, res) => {
    const { nome, codigo_barras, descricao, quantidade, categoria } = req.body;

    // Verificar se todos os campos obrigatórios estão preenchidos
    if (!nome || !codigo_barras || !descricao || !quantidade || !categoria) {
      return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser preenchidos!' });
    }

    // Inserir no banco de dados
    const sql = `
      INSERT INTO produtos (nome, codigo_barras, descricao, quantidade, categoria)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.run(sql, [nome, codigo_barras, descricao, quantidade, categoria], function (err) {
      if (err) {
        if (err.code === 'SQLITE_CONSTRAINT') {
          return res.status(409).json({ mensagem: 'Produto com este código de barras já está cadastrado!' });
        }
        return res.status(500).json({ mensagem: 'Erro ao cadastrar produto', erro: err.message });
      }
      res.status(201).json({ mensagem: 'Produto cadastrado com sucesso!', id: this.lastID });
    });
  },

  // Listar todos os produtos
  listarProdutos: (req, res) => {
    const sql = 'SELECT * FROM produtos';
    db.all(sql, [], (err, rows) => {
      if (err) {
        return res.status(500).json({ mensagem: 'Erro ao listar produtos', erro: err.message });
      }
      res.status(200).json(rows);
    });
  },

  // Atualizar um produto
  atualizarProduto: (req, res) => {
    const { id } = req.params;
    const { nome, codigo_barras, descricao, quantidade, categoria } = req.body;

    if (!nome || !codigo_barras || !descricao || !quantidade || !categoria) {
      return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser preenchidos!' });
    }

    const sql = `
      UPDATE produtos
      SET nome = ?, codigo_barras = ?, descricao = ?, quantidade = ?, categoria = ?
      WHERE id = ?
    `;
    db.run(sql, [nome, codigo_barras, descricao, quantidade, categoria, id], function (err) {
      if (err) {
        if (err.code === 'SQLITE_CONSTRAINT') {
          return res.status(409).json({ mensagem: 'Código de barras já está em uso por outro produto!' });
        }
        return res.status(500).json({ mensagem: 'Erro ao atualizar produto', erro: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ mensagem: 'Produto não encontrado!' });
      }
      res.status(200).json({ mensagem: 'Produto atualizado com sucesso!' });
    });
  },

  // Deletar um produto
  deletarProduto: (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM produtos WHERE id = ?';
    db.run(sql, [id], function (err) {
      if (err) {
        return res.status(500).json({ mensagem: 'Erro ao deletar produto', erro: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ mensagem: 'Produto não encontrado!' });
      }
      res.status(200).json({ mensagem: 'Produto deletado com sucesso!' });
    });
  }
};

module.exports = produtosController;