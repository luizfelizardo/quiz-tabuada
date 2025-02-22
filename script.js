let perguntaAtual;
let respostaCorreta;
let pontuacao = 0;
let numeroDePerguntas = 9;
let opcoes = [];
let tempoRestante = 60; // Tempo em segundos
let cronometro;
let botoes = document.querySelectorAll("#opcoes button"); // Seleciona os botões aqui

function gerarPergunta() {
  const numero1 = Math.floor(Math.random() * 9) + 1;
  const numero2 = Math.floor(Math.random() * 9) + 1;
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
  for (let i = 0; i < botoes.length; i++) {
    botoes[i].textContent = opcoes[i];
    botoes[i].classList.remove("correto", "incorreto");
  }
}

function verificarResposta(respostaUsuario) {
  if (respostaUsuario == respostaCorreta) {
    pontuacao++;
    document.getElementById("resultado").textContent = "Resposta correta!";
    document.querySelector(`#opcoes button:contains('${respostaUsuario}')`).classList.add("correto");
  } else {
    document.getElementById("resultado").textContent = "Resposta incorreta. Tente novamente.";
    document.querySelector(`#opcoes button:contains('${respostaUsuario}')`).classList.add("incorreto");
    document.querySelector(`#opcoes button:contains('${respostaCorreta}')`).classList.add("correto");
  }
}

function proximaPergunta() {
  if (numeroDePerguntas > 0) {
    numeroDePerguntas--;
    gerarPergunta();
    gerarOpcoes();
    document.getElementById("resultado").textContent = "";
    reiniciarCronometro();
    botoes.forEach(botao => botao.disabled = false); // Reabilita os botões
  } else {
    document.getElementById("resultado").textContent = `Fim do quiz! Sua pontuação foi nota ${pontuacao}.`;
    clearInterval(cronometro);
    botoes.forEach(botao => botao.disabled = true); // Desabilita os botões
    document.getElementById("proxima").disabled = true; // Desabilita o botão "Próxima Pergunta"
  }
}

function iniciarCronometro() {
  cronometro = setInterval(() => {
    tempoRestante--;
    document.getElementById("cronometro").textContent = `Tempo restante: ${tempoRestante} segundos`;
    if (tempoRestante <= 0) {
      clearInterval(cronometro); // Interrompe o intervalo *apenas uma vez*
      botoes.forEach(botao => botao.disabled = true); // Desabilita os botões *primeiro*
      verificarResposta(null); // Verifica a resposta (mesmo que nula)
      alert("Tempo esgotado!"); // Exibe o alerta
      document.getElementById("resultado").textContent = `Fim do quiz! Sua pontuação foi ${pontuacao}.`; // Define o texto do resultado *depois* de travar os botões
      document.getElementById("proxima").disabled = true; // Desabilita o botão "Próxima Pergunta"
      // tempoRestante = 60; // Reinicia o tempo (se necessário)
    }
  }, 1000);
}

document.getElementById("opcoes").addEventListener("click", function(event) {
  const botaoSelecionado = event.target;
  if (botaoSelecionado.tagName === "BUTTON") {
    botoes.forEach(botao => botao.classList.remove("selecionado"));
    botaoSelecionado.classList.add("selecionado");
    verificarResposta(botaoSelecionado.textContent);
  }
});

gerarPergunta();
gerarOpcoes();
iniciarCronometro();