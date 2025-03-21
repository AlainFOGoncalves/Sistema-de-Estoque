const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Rota básica
app.get('/', (req, res) => {
  res.send('Bem-vindo ao sistema de estoque!');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});