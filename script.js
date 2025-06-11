const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const startPauseBt = document.querySelector("#start-pause");
const musicaFocoInput = document.querySelector("#alternar-musica");
const iniciaOuPausarBt = document.querySelector('#start-pause span');
const iniciarOuPausarIcone = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')
const musica = new Audio("/sons/luna-rise-part-one.mp3");
const somPause = new Audio("/sons/pause.mp3");
const beep = new Audio("sons/beep.mp3");
const somPlay = new Audio("sons/play.wav");

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

focoBt.addEventListener("click", () => {
  alterarContexto("foco");
  focoBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
  alterarContexto("descanso-curto");
  curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
  alterarContexto("descanso-longo");
  longoBt.classList.add("active");
});

function alterarContexto(contexto) {
  botoes.forEach(function (botao) {
    botao.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
        `;
      break;
    case "descanso-curto":
      titulo.innerHTML = `
            Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
        `;
      tempoDecorridoEmSegundos = 300;
      mostrarTempo();
      break;
    case "descanso-longo":
      titulo.innerHTML = `
            Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa!</strong>
        `;
      tempoDecorridoEmSegundos = 900;
      mostrarTempo();
      break;
    default:
      break;
  }
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    beep.play();
    zerar();
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTempo()
};

function iniciarOuPausar() {
  if (intervaloId) {
    somPause.play();
    zerar();
    return;
  }
  if (tempoDecorridoEmSegundos !== 5) {
    somPause.play();
  } else {
    somPlay.play();
  }
  intervaloId = setInterval(contagemRegressiva, 1000); // novo temporizador
  iniciaOuPausarBt.textContent = "Pausar"
  iniciarOuPausarIcone.setAttribute('src', 'imagens/pause.png')
}

function zerar() {
  clearInterval(intervaloId); // interrompe o temporizador
  iniciaOuPausarBt.textContent = "Começar"
  iniciarOuPausarIcone.setAttribute('src', 'imagens/play_arrow.png')
  intervaloId = null; // descarta o id antigo
}

startPauseBt.addEventListener("click", iniciarOuPausar); // ocorre o clique

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000)
  const tempoFormatado = tempo.toLocaleString('pt-Br', {minute: '2-digit', second: '2-digit'})
  tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()