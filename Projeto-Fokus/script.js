const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const startEPause = document.querySelector("#start-pause");
const musicaFocoInput = document.querySelector("#alternar-musica");
const musica = new Audio("/Projeto-Fokus/sons/luna-rise-part-one.mp3");
const musicaPlay = new Audio("/Projeto-Fokus/sons/play.wav");
const musicaPause = new Audio("/Projeto-Fokus/sons/pause.mp3");
const musicaBeep = new Audio("/Projeto-Fokus/sons/beep.mp3");
musica.loop = true;

let tempoDecorridoEmSegundos = 5;
let intervaloId = null;

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
    zerar();
    musicaBeep.play();
    alert("Tempo Finalizado!");
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  console.log("Temporizador: " + tempoDecorridoEmSegundos);
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
}

function zerar() {
  clearInterval(intervaloId);
  intervaloId = null;
}
