/*
  ================================================
  CONFIGURAÇÕES DO SEU SITE BATMAN & HELLO KITTY:
  1. START_DATE: Data do início do namoro (AAAA-MM-DDTHH:mm:ss).
  2. SPECIAL_MEMORY: Frase especial sobre vocês.
  ================================================
*/

const START_DATE = "2026-08-17T11:40:00"; // Data de namoro

const SPECIAL_MEMORY =
  "Da maneira mais inesperada, mesmo sem procurar, encontrei o amor da minha vida!";

// Elementos da página
const openButton = document.getElementById("openLetter");
const intro = document.getElementById("inicio");
const surprise = document.getElementById("surprise");
const revealButton = document.getElementById("revealMessage");
const finalMessage = document.getElementById("finalMessage");
const loveSong = document.getElementById("loveSong");
const playMusicBtn = document.getElementById("playMusicBtn");

// Data de início do namoro
const startDate = new Date(START_DATE);

// Controle de Áudio
let isPlaying = false;

playMusicBtn.addEventListener("click", () => {
  if (isPlaying) {
    loveSong.pause();
    playMusicBtn.textContent = "▶️ Tocar";
    isPlaying = false;
  } else {
    loveSong.play().then(() => {
      playMusicBtn.textContent = "⏸️ Pausar";
      isPlaying = true;
    }).catch(err => {
      console.log("Aviso de mídia:", err);
      alert("Coloque o arquivo de áudio na pasta img (img/musica.mp3) para tocar a música do casal!");
    });
  }
});

// Abertura do Envelope
openButton.addEventListener("click", () => {
  openButton.classList.add("opened");
  openButton.disabled = true;
  openButton.querySelector(".open-hint").textContent = "Abrindo a cartinha do Batman e Hello Kitty...";

  if (!isPlaying) {
    loveSong.play().then(() => {
      playMusicBtn.textContent = "⏸️ Pausar";
      isPlaying = true;
    }).catch(e => {
      console.log("Autoplay retido pelo navegador:", e);
    });
  }

  window.setTimeout(() => {
    intro.classList.add("hidden");
    surprise.classList.remove("hidden");

    document.getElementById("carta").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 850);
});

// Revelação do Botão Final
revealButton.addEventListener("click", () => {
  const isHidden = finalMessage.classList.contains("hidden");

  if (isHidden) {
    finalMessage.classList.remove("hidden");
    revealButton.textContent = "Fechar Recadinho 💙💜";

    finalMessage.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  } else {
    finalMessage.classList.add("hidden");
    revealButton.textContent = "Toque Aqui Para Ver a Surpresa Final ✨";
  }
});

// Atualiza a frase da memória especial
document.getElementById("memoryText").textContent = SPECIAL_MEMORY;

// Contador de Tempo
function updateCounter() {
  const now = new Date();
  const elapsed = now.getTime() - startDate.getTime();

  if (Number.isNaN(startDate.getTime()) || elapsed < 0) {
    document.getElementById("days").textContent = "--";
    document.getElementById("hours").textContent = "--";
    document.getElementById("minutes").textContent = "--";
    document.getElementById("seconds").textContent = "--";
    return;
  }

  const totalSeconds = Math.floor(elapsed / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCounter();
window.setInterval(updateCounter, 1000);

// Elementos Flutuantes de Fundo: Bat-sinais (🦇) e Laços da Hello Kitty (🎀) + Corações (💙💜)
const heartsBackground = document.querySelector(".hearts-background");
const symbols = ["🦇", "🎀", "💙", "💜", "✨"];

for (let i = 0; i < 26; i++) {
  const item = document.createElement("span");
  item.textContent = symbols[i % symbols.length];
  item.setAttribute("aria-hidden", "true");

  const randomSize = 16 + Math.random() * 24;

  item.style.cssText = `
    position: fixed;
    z-index: -1;
    left: ${Math.random() * 100}vw;
    top: ${Math.random() * 100}vh;
    opacity: 0.22;
    font-size: ${randomSize}px;
    pointer-events: none;
    user-select: none;
    animation: floatElement ${6 + Math.random() * 7}s ease-in-out infinite alternate;
  `;

  heartsBackground.appendChild(item);
}

// Injeta keyframes da animação
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes floatElement {
    0% { transform: translateY(0px) rotate(0deg); }
    100% { transform: translateY(-30px) rotate(15deg); }
  }
`;
document.head.appendChild(styleSheet);