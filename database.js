const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./estoque.db');

// Criar tabela de fornecedores
db.serialize(() => {
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

  // Criar tabela de produtos
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
});

module.exports = db;