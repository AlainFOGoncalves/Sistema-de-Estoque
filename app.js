const express = require('express');
const app = express();
const PORT = 3000;
const fornecedoresController = require('./controllers/fornecedoresController');

app.use(express.json());

// Rotas de fornecedores
app.post('/fornecedores', fornecedoresController.cadastrarFornecedor);
app.get('/fornecedores', fornecedoresController.listarFornecedores);
app.put('/fornecedores/:id', fornecedoresController.atualizarFornecedor);
app.delete('/fornecedores/:id', fornecedoresController.deletarFornecedor);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});