const questions = [
  {
    q: "Ramu reel pampisthe first reaction enti? 😂",
    options: ["😂 Navvukunta", "❤️ React chesta", "👀 Chusi silent ga untanu", "🫠 Ee gola enti ra babu anukunta"]
  },
  {
    q: "Ramu ekkuva messages chesthe em chestav? 🤨",
    options: ["😂 Reply ista", "😑 Konchem ignore chesta", "🫡 Tappadu... tolerate cheyyali", "🚨 Block button ekkada undi?"]
  },
  {
    q: "Nijam cheppu... Ramu ela untadu? 😂",
    options: ["😇 Chaala manchodu", "😂 Konchem over", "🤦‍♀️ Full irritating", "😌 Sare le... okay-ish"]
  },
  {
    q: "Ramu ni thittadam lo nee favourite dialogue enti? 😂",
    options: ["Elleehe 😂", "Achaa 😌", "Dhoraa 🤨", "Govardhanaa 😂"]
  }
];

let current = 0;
let answers = [];

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");
const startBtn = document.getElementById("startBtn");
const questionNumber = document.getElementById("questionNumber");
const question = document.getElementById("question");
const options = document.getElementById("options");
const progressBar = document.getElementById("progressBar");
const answerReview = document.getElementById("answerReview");
const finalVerdict = document.getElementById("finalVerdict");
const downloadBtn = document.getElementById("downloadBtn");
const restartBtn = document.getElementById("restartBtn");
const toast = document.getElementById("toast");

startBtn.addEventListener("click", () => {
  current = 0;
  answers = [];
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  renderQuestion();
});

function renderQuestion() {
  const item = questions[current];
  questionNumber.textContent = `Question ${current + 1} / ${questions.length}`;
  question.textContent = item.q;
  progressBar.style.width = `${(current / questions.length) * 100}%`;
  options.innerHTML = "";

  item.options.forEach((text, index) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = text;
    btn.addEventListener("click", () => chooseAnswer(index));
    options.appendChild(btn);
  });
}

function chooseAnswer(index) {
  answers.push({
    question: questions[current].q,
    answer: questions[current].options[index]
  });

  current++;
  if (current < questions.length) {
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  progressBar.style.width = "100%";

  const funScore = answers.reduce((sum, item) => {
    if (item.answer.includes("❤️") || item.answer.includes("Obviously")) return sum + 2;
    if (item.answer.includes("😂") || item.answer.includes("😌")) return sum + 1;
    return sum;
  }, 0);

  const level = Math.min(100, 85 + funScore * 2);
  document.getElementById("friendshipLevel").textContent = `${level}%`;

  if (level >= 96) {
    finalVerdict.textContent = "Final Verdict: Ee friendship ni official ga approve chesam 😂❤️";
  } else if (level >= 90) {
    finalVerdict.textContent = "Final Verdict: Friendship bagane undi... Ramu konchem takkuva gola chesthe inka better 😂";
  } else {
    finalVerdict.textContent = "Final Verdict: Ramu tho friendship continue cheyyadam thappa vere option kanipinchadam ledu 😂";
  }

  answerReview.innerHTML = "";
  answers.forEach((item) => {
    const row = document.createElement("div");
    row.className = "answerRow";
    row.innerHTML = `<div class="answerQ">${escapeHtml(item.question)}</div><div class="answerA">${escapeHtml(item.answer)}</div>`;
    answerReview.appendChild(row);
  });

  confetti();
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
}

downloadBtn.addEventListener("click", async () => {
  const certificate = document.getElementById("certificate");
  await downloadCertificate(certificate);
});

async function downloadCertificate(element) {
  // GitHub Pages-compatible: loads html2canvas from CDN only when needed.
  if (!window.html2canvas) {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
    script.onload = () => createCertificateImage(element);
    script.onerror = () => showToast("Download load avvaledu. Screenshot teesko 😂");
    document.head.appendChild(script);
  } else {
    createCertificateImage(element);
  }
}

async function createCertificateImage(element) {
  showToast("Certificate prepare avtundi... ✨");
  const canvas = await html2canvas(element, {
    backgroundColor: "#171027",
    scale: 2,
    useCORS: true
  });

  const link = document.createElement("a");
  link.download = "friendship-certificate-sanjana.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
  showToast("Certificate download ayindi! 🏆");
}

restartBtn.addEventListener("click", () => {
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
  answers = [];
  current = 0;
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2400);
}

function confetti() {
  const symbols = ["🎉", "✨", "💜", "🌙", "😂", "❤️"];
  for (let i = 0; i < 55; i++) {
    const piece = document.createElement("span");
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    piece.style.position = "fixed";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.top = "-30px";
    piece.style.fontSize = `${15 + Math.random() * 18}px`;
    piece.style.zIndex = "20";
    piece.style.pointerEvents = "none";
    piece.style.transition = `transform ${1.5 + Math.random()}s linear, opacity 2s`;
    document.body.appendChild(piece);

    requestAnimationFrame(() => {
      piece.style.transform = `translateY(${100 + Math.random() * 100}vh) rotate(${Math.random() * 720}deg)`;
      piece.style.opacity = "0";
    });

    setTimeout(() => piece.remove(), 2600);
  }
}
