const db = require('../database');

const associacaoController = {
  // Associar fornecedor a produto
  associarFornecedorProduto: (req, res) => {
    const { produto_id, fornecedor_id } = req.body;

    if (!produto_id || !fornecedor_id) {
      return res.status(400).json({ mensagem: 'Produto ID e Fornecedor ID são obrigatórios!' });
    }

    // Verificar se o produto e o fornecedor existem
    db.get('SELECT id FROM produtos WHERE id = ?', [produto_id], (err, produto) => {
      if (err) return res.status(500).json({ mensagem: 'Erro ao verificar produto', erro: err.message });
      if (!produto) return res.status(404).json({ mensagem: 'Produto não encontrado!' });

      db.get('SELECT id FROM fornecedores WHERE id = ?', [fornecedor_id], (err, fornecedor) => {
        if (err) return res.status(500).json({ mensagem: 'Erro ao verificar fornecedor', erro: err.message });
        if (!fornecedor) return res.status(404).json({ mensagem: 'Fornecedor não encontrado!' });

        // Inserir a associação
        const sql = 'INSERT INTO produto_fornecedor (produto_id, fornecedor_id) VALUES (?, ?)';
        db.run(sql, [produto_id, fornecedor_id], function (err) {
          if (err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
              return res.status(409).json({ mensagem: 'Fornecedor já está associado a este produto!' });
            }
            return res.status(500).json({ mensagem: 'Erro ao associar', erro: err.message });
          }
          res.status(201).json({ mensagem: 'Fornecedor associado com sucesso ao produto!' });
        });
      });
    });
  },

  // Desassociar fornecedor de produto
  desassociarFornecedorProduto: (req, res) => {
    const { produto_id, fornecedor_id } = req.body;

    if (!produto_id || !fornecedor_id) {
      return res.status(400).json({ mensagem: 'Produto ID e Fornecedor ID são obrigatórios!' });
    }

    const sql = 'DELETE FROM produto_fornecedor WHERE produto_id = ? AND fornecedor_id = ?';
    db.run(sql, [produto_id, fornecedor_id], function (err) {
      if (err) {
        return res.status(500).json({ mensagem: 'Erro ao desassociar', erro: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ mensagem: 'Associação não encontrada!' });
      }
      res.status(200).json({ mensagem: 'Fornecedor desassociado com sucesso!' });
    });
  },

  // Listar fornecedores de um produto
  listarFornecedoresPorProduto: (req, res) => {
    const { id } = req.params;

    const sql = `
      SELECT f.*
      FROM fornecedores f
      JOIN produto_fornecedor pf ON f.id = pf.fornecedor_id
      WHERE pf.produto_id = ?
    `;
    db.all(sql, [id], (err, rows) => {
      if (err) {
        return res.status(500).json({ mensagem: 'Erro ao listar fornecedores', erro: err.message });
      }
      res.status(200).json(rows);
    });
  }
};

module.exports = associacaoController;