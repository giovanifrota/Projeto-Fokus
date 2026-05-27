const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const startEPause = document.querySelector("#start-pause");
const iniciarOuPausarBT = document.querySelector("#start-pause span");
const tempoNaTela = document.querySelector("#timer");
const imagemIconBT = document.querySelector(".app__card-primary-butto-icon");
const musicaFocoInput = document.querySelector("#alternar-musica");
const musica = new Audio("/Projeto-Fokus/sons/luna-rise-part-one.mp3");
const musicaPlay = new Audio("/Projeto-Fokus/sons/play.wav");
const musicaPause = new Audio("/Projeto-Fokus/sons/pause.mp3");
const musicaBeep = new Audio("/Projeto-Fokus/sons/beep.mp3");
musica.loop = true;

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

imagemIconBT.src = "/Projeto-Fokus/imagens/play_arrow.png";

musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

focoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 1500;
  alterarContexto("foco");
  focoBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300;
  alterarContexto("descanso-curto");
  curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900;
  alterarContexto("descanso-longo");
  longoBt.classList.add("active");
});

function alterarContexto(contexto) {
  mostraTempo();
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      titulo.innerHTML = `Otimize sua produtividade,<br />
          <strong class="app__title-strong">mergulhe no que importa.</strong>
    `;
      break;

    case "descanso-curto":
      titulo.innerHTML = `
      Que tal dar uma respirada?<br />
          <strong class="app__title-strong">Faça uma pausa curta!</strong>`;

      break;

    case "descanso-longo":
      titulo.innerHTML = `Hora de voltar à superfície.<br />
          <strong class="app__title-strong">Faça uma pausa longa.</strong>
      `;

      break;
    default:
      break;
  }
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    musicaBeep.play();
    alert("Tempo Finalizado!");
    const focoAtivo = html.getAttribute("data-contexto") == "foco";
    if (focoAtivo) {
      const evento = new CustomEvent("focoFinalizado");
      document.dispatchEvent(evento);
    }
    zerar();
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  mostraTempo();
};

startEPause.addEventListener("click", iniciarOuParar);

function iniciarOuParar() {
  if (intervaloId) {
    zerar();
    musicaPause.play();
    return;
  }

  musicaPlay.play();
  intervaloId = setInterval(contagemRegressiva, 1000);
  iniciarOuPausarBT.textContent = "Pausar";
  imagemIconBT.src = "/Projeto-Fokus/imagens/pause.png";
}

function zerar() {
  clearInterval(intervaloId);
  intervaloId = null;
  iniciarOuPausarBT.textContent = "Começar";
  imagemIconBT.src = "/Projeto-Fokus/imagens/play_arrow.png";
}

function mostraTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleString("pt-Br", {
    minute: "2-digit",
    second: "2-digit",
  });
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}
mostraTempo();
