const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public'))); 

app.post('/countdown', (requisicao, resposta) => {
  const { targetDate: dataAlvo } = requisicao.body;
  const dataAtual = new Date();
  const alvo = new Date(dataAlvo);

  if (isNaN(alvo)) {
    return resposta.status(400).json({ error: 'Data inválida' });
  }

  const diferenca = Math.floor((alvo - dataAtual) / 1000);
  if (diferenca <= 0) {
    return resposta.json({ finished: true });
  }

  const dias = Math.floor(diferenca / (60 * 60 * 24));
  const horas = Math.floor((diferenca % (60 * 60 * 24)) / (60 * 60));
  const minutos = Math.floor((diferenca % (60 * 60)) / 60);
  const segundos = diferenca % 60;

  resposta.json({ finished: false, dias, horas, minutos, segundos });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Rodando em http://localhost:${PORT}`));
