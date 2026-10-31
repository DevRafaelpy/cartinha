/*
  ================================================
  CONFIGURAÇÕES DO SEU SITE BATMAN & HELLO KITTY:
  1. START_DATE: Data do início do namoro (AAAA-MM-DDTHH:mm:ss).
  2. SPECIAL_MEMORY: Frase especial sobre vocês.
  ================================================
*/

const START_DATE = "2026-08-17T11:40:00"; // Data de namoro

const SPECIAL_MEMORY =
  "Eclesiastes 4:9-10: É melhor serem dois do que um, porque têm maior recompiza pelo seu trabalho. Se um cair, o outro ajuda a levantar-se.";

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

// ===== LÓGICA DO QUIZ DE 10 PERGUNTAS =====
const quizQuestions = [
  {
    question: "1. Qual era minha comida favorita nos encontros?",
    options: ["Pizza de Frango", "Tortilete 🥧", "Açai com TUDO", "Pastel"],
    correct: 1
  },
  {
    question: "2. Qual meu personagem favorito dos desenhos?",
    options: ["Homem-Aranha", "Batman 🦇", "Superman", "Snoopy"],
    correct: 1
  },
  {
    question: "3. Qual a coisa que eu mais gosto de fazer?",
    options: ["Jogar videogame", "Dormir o dia todo", "Ficar com meu Momô 💙", "Assistir séries"],
    correct: 2
  },
  {
    question: "4. Onde foi nosso primeiro encontro?",
    options: ["Shopping", "Praça", "Palato", "Cinema"],
    correct: 2
  },
  {
    question: "5. Qual a coisa que eu mais amo fazer quando estamos juntos?",
    options: ["Te beijar 💋", "Conversar sobre futebol", "Ficar no celular", "Tirar fotos"],
    correct: 0
  },
  {
    question: "6. Quem é a minha cantora favorita?",
    options: ["Taylor Swift", "Mayara Karolaine 🎀", "Billie Eilish", "H.E.R."],
    correct: 1
  },
  {
    question: "7. Qual a coisa que mais odeio?",
    options: ["Acordar cedo", "Pegar trânsito", "Comida fria", "Ficar longe da minha namorada 🥺"],
    correct: 3
  },
  {
    question: "8. Qual foi a primeira comida que você me fez experimentar?",
    options: ["Morango 🍓", "Chocolate amargo", "Sushi", "Torta de maçã"],
    correct: 0
  },
  {
    question: "9. Por que eu escolhi te amar?",
    options: ["Por conta do seu estilo", "Porque você me dava doces", "Porque em você percebi tudo que tinha de bom... ✨", "Foi pura sorte"],
    correct: 2
  },
  {
    question: "10. Qual a coisa mais íntima que fiz com você?",
    options: ["Contar um segredo de infância", "Chorar com você e ser meloso 💜", "Mostrar fotos antigas", "Cantar desafinado"],
    correct: 1
  }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
  const quizCounterEl = document.getElementById("quizCounter");
  const questionTextEl = document.getElementById("questionText");
  const optionsGridEl = document.getElementById("optionsGrid");

  if (!quizCounterEl || !questionTextEl || !optionsGridEl) return;

  const q = quizQuestions[currentQuestionIndex];
  quizCounterEl.textContent = `Pergunta ${currentQuestionIndex + 1} de ${quizQuestions.length}`;
  questionTextEl.textContent = q.question;

  optionsGridEl.innerHTML = "";

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.className = "quiz-option";
    btn.textContent = opt;
    btn.onclick = () => selectOption(index);
    optionsGridEl.appendChild(btn);
  });
}

function selectOption(index) {
  if (index === quizQuestions[currentQuestionIndex].correct) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    loadQuestion();
  } else {
    showQuizResult();
  }
}

function showQuizResult() {
  const questionBox = document.getElementById("questionBox");
  const quizProgress = document.querySelector(".quiz-progress");
  const resultDiv = document.getElementById("quizResult");
  const scoreText = document.getElementById("quizScoreText");

  if (questionBox) questionBox.classList.add("hidden");
  if (quizProgress) quizProgress.classList.add("hidden");
  
  if (scoreText) {
    scoreText.textContent = `Você acertou ${score} de ${quizQuestions.length} perguntas!`;
  }
  if (resultDiv) {
    resultDiv.classList.remove("hidden");
  }
}

// Inicializa a primeira pergunta do quiz ao carregar
loadQuestion();

// Contador de Tempo (Relógio)
function updateCounter() {
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const now = new Date();
  const elapsed = now.getTime() - startDate.getTime();

  if (Number.isNaN(startDate.getTime()) || elapsed < 0) {
    daysEl.textContent = "--";
    hoursEl.textContent = "--";
    minutesEl.textContent = "--";
    secondsEl.textContent = "--";
    return;
  }

  const totalSeconds = Math.floor(elapsed / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  daysEl.textContent = days;
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

updateCounter();
window.setInterval(updateCounter, 1000);

// Elementos Flutuantes de Fundo: Bat-sinais (🦇) e Laços da Hello Kitty (🎀) + Corações (💙💜)
const heartsBackground = document.querySelector(".hearts-background");
if (heartsBackground) {
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
}

// ===== LÓGICA DA MÁQUINA DE 30 MOTIVOS =====
const loveReasons = [
  "1. Amo o jeito que você ri das minhas piadas sem graça💜",
  "2. Amo a forma como você cuida de mim e me faz sentir em paz 🦇",
  "3. Amo o brilho nos seus olhos quando a gente fala das nossas coisas 🎀",
  "4. Amo nossas conversas olhando as escadas e o teto ✨",
  "5. Amo o teu carinho e o teu dengo que melhoram qualquer dia ruim 💙",
  "6. Amo simplesmente o fato de poder te chamar de minha namorada! 🥰",
  "7. Amo o seu jeitinho meigo e paciente comigo 💜",
  "8. Amo quando a gente fica juntinho dividindo o mesmo espaço 🦇",
  "9. Amo a sua beleza única e o seu olhar brilhante 🎀",
  "10. Amo as comidinhas e os lanches que a gente compartilha (especialmente tortilete 🥧)!",
  "11. Amo saber que posso ser totalmente eu mesmo com você 💙",
  "12. Amo o seu jeitinho de me acalmar quando estou preocupado ✨",
  "13. Amo as mensagens fofas que você me manda 📱💜",
  "14. Amo o fato de que entre bilhões de pessoas, eu escolhi você 🦇",
  "15. Amo planejar o nosso futuro e imaginar a gente juntos 🎀",
  "16. Amo quando você fica brava com coisinhas bobas, porque até assim você é linda",
  "17. Amo o som da sua risada e como ela ilumina meu dia 💙",
  "18. Amo a nossa sintonia e como a gente se entende só pelo olhar ✨",
  "19. Amo o teu abraço, que é o melhor lugar do mundo inteiro 🫂",
  "20. Amo o quanto você se importa com os mínimos detalhes 💜",
  "21. Amo ser o seu Mozão e poder cuidar do meu mozinho 🦇🎀",
  "22. Amo quando a gente assiste às nossas coisas juntinhos 💙",
  "23. Amo as nossas conversas que duram horas ✨",
  "24. Amo o orgulho que sinto de poder te chamar de meu amor 💜",
  "25. Amo o seu coração gigante e bondoso 🥹",
  "26. Amo como a nossa história aconteceu de forma tão inesperada e perfeita 💙",
  "27. Amo cada pedacinho da sua personalidade única 🎀",
  "28. Amo quando você me mima e me dá dengo ✨",
  "29. Amo saber que Deus colocou você na minha vida no momento certo 💜",
  "30. Amo você simplesmente por ser exatamente quem você é, meu tudão! 🦇🎀💙"
];

const drawReasonBtn = document.getElementById("drawReasonBtn");
const reasonCard = document.getElementById("reasonCard");

let lastIndex = -1;

if (drawReasonBtn && reasonCard) {
  drawReasonBtn.addEventListener("click", () => {
    let randomIndex;
    
    // Garante que o motivo sorteado não repita o imediatamente anterior
    do {
      randomIndex = Math.floor(Math.random() * loveReasons.length);
    } while (randomIndex === lastIndex && loveReasons.length > 1);

    lastIndex = randomIndex;

    // Aplica o efeito visual suave de troca
    reasonCard.style.opacity = "0";
    
    setTimeout(() => {
      reasonCard.textContent = loveReasons[randomIndex];
      reasonCard.style.opacity = "1";
    }, 200);
  });
}