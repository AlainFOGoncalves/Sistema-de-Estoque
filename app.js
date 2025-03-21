const express = require('express');
const app = express();
const PORT = 3000;
const fornecedoresController = require('./controllers/fornecedoresController');

// Middleware para interpretar JSON
app.use(express.json());

// Rotas de fornecedores
app.post('/fornecedores', fornecedoresController.cadastrarFornecedor);
app.get('/fornecedores', fornecedoresController.listarFornecedores);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});