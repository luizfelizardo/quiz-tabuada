let perguntaAtual;
let respostaCorreta;
let pontuacao = 0;
let numeroDePerguntas = 10;
let opcoes = [];

function gerarPergunta() {
  const numero1 = Math.floor(Math.random() * 10) + 1;
  const numero2 = Math.floor(Math.random() * 10) + 1;
  perguntaAtual = `${numero1} x ${numero2}`;
  respostaCorreta = numero1 * numero2;
  document.getElementById("pergunta").textContent = perguntaAtual;
}

function gerarOpcoes() {
  opcoes = [];

  opcoes.push(respostaCorreta);

  while (opcoes.length < 4) {
    const respostaIncorreta = Math.floor(Math.random() * 100) + 1;
    if (!opcoes.includes(respostaIncorreta)) {
      opcoes.push(respostaIncorreta);
    }
  }

  opcoes.sort(() => Math.random() - 0.5);

  const botoes = document.querySelectorAll("#opcoes button");
  for (let i = 0; i < botoes.length; i++) {
    botoes[i].textContent = opcoes[i];
  }
}

function verificarResposta() {
  const respostaUsuario = document.querySelector("#opcoes button.selecionado").textContent;
  if (respostaUsuario == respostaCorreta) {
    pontuacao++;
    document.getElementById("resultado").textContent = "Resposta correta!";
  } else {
    document.getElementById("resultado").textContent = "Resposta incorreta. Tente novamente.";
  }
}

function proximaPergunta() {
  if (numeroDePerguntas > 0) {
    numeroDePerguntas--;
    gerarPergunta();
    gerarOpcoes();
    document.getElementById("resultado").textContent = ""; // Limpa o feedback anterior
  } else {
    document.getElementById("resultado").textContent = `Fim do quiz! Sua pontuação foi ${pontuacao}.`;
  }
}

document.getElementById("opcoes").addEventListener("click", function(event) {
  const botaoSelecionado = event.target;
  if (botaoSelecionado.tagName === "BUTTON") {
    const botoes = document.querySelectorAll("#opcoes button");
    botoes.forEach(botao => botao.classList.remove("selecionado"));
    botaoSelecionado.classList.add("selecionado");
  }
});

gerarPergunta();
gerarOpcoes();