const express = require('express');
const app = express();
const PORT = 3000;
const fornecedoresController = require('./controllers/fornecedoresController');
const produtosController = require('./controllers/produtosController');

app.use(express.json());

// Rotas de fornecedores
app.post('/fornecedores', fornecedoresController.cadastrarFornecedor);
app.get('/fornecedores', fornecedoresController.listarFornecedores);
app.put('/fornecedores/:id', fornecedoresController.atualizarFornecedor);
app.delete('/fornecedores/:id', fornecedoresController.deletarFornecedor);

// Rotas de produtos
app.post('/produtos', produtosController.cadastrarProduto);
app.get('/produtos', produtosController.listarProdutos);
app.put('/produtos/:id', produtosController.atualizarProduto);
app.delete('/produtos/:id', produtosController.deletarProduto);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});