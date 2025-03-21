const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./estoque.db');

// Criar tabelas
db.serialize(() => {
  // Tabela de fornecedores
  db.run(`
    CREATE TABLE IF NOT EXISTS fornecedores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      cnpj TEXT UNIQUE NOT NULL,
      endereco TEXT NOT NULL,
      telefone TEXT NOT NULL,
      email TEXT NOT NULL,
      contato TEXT NOT NULL
    )
  `);

  // Tabela de produtos
  db.run(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      codigo_barras TEXT UNIQUE NOT NULL,
      descricao TEXT NOT NULL,
      quantidade INTEGER NOT NULL,
      categoria TEXT NOT NULL
    )
  `);

  // Tabela de associação produto-fornecedor
  db.run(`
    CREATE TABLE IF NOT EXISTS produto_fornecedor (
      produto_id INTEGER,
      fornecedor_id INTEGER,
      PRIMARY KEY (produto_id, fornecedor_id),
      FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE,
      FOREIGN KEY (fornecedor_id) REFERENCES fornecedores(id) ON DELETE CASCADE
    )
  `);
});

module.exports = db;