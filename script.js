const typeGrid = document.querySelector("#typeGrid");
const questionArea = document.querySelector("#questionArea");
const resultArea = document.querySelector("#resultArea");
const progressBar = document.querySelector("#progressBar");
const prevBtn = document.querySelector("#prevBtn");
const restartBtn = document.querySelector("#restartBtn");

const axisLabels = {
  edge: "선명한 경계",
  texture: "섬세한 무늬",
  glow: "반짝이는 에너지",
  depth: "깊은 몰입",
  soft: "부드러운 온기"
};

let eyeTypes = [];
let questions = [];
let current = 0;
let answers = [];

async function loadData() {
  const [typesRes, questionsRes] = await Promise.all([
    fetch("./data/eye-types.json"),
    fetch("./data/test-questions.json")
  ]);
  eyeTypes = await typesRes.json();
  questions = await questionsRes.json();
}

function renderTypes() {
  typeGrid.innerHTML = eyeTypes.map(type => `
    <article class="type-card" id="type-${type.slug}">
      <strong>${type.name}</strong>
      <h3>${type.summary}</h3>
      <p>${type.description}</p>
      <div class="keywords">${type.keywords.map(keyword => `<span>${keyword}</span>`).join("")}</div>
    </article>
  `).join("");
}

function renderQuestion() {
  const question = questions[current];
  const percent = Math.round((current / questions.length) * 100);
  progressBar.style.width = `${percent}%`;
  resultArea.classList.add("hidden");
  questionArea.classList.remove("hidden");
  restartBtn.classList.add("hidden");
  prevBtn.classList.toggle("hidden", current === 0);

  questionArea.innerHTML = `
    <p class="eyebrow">${current + 1} / ${questions.length}</p>
    <h3>${question.question}</h3>
    <div class="answers">
      ${question.answers.map((answer, index) => `
        <button class="answer" type="button" data-answer="${index}">${answer.label}</button>
      `).join("")}
    </div>
  `;
}

function addScores(total, scores) {
  Object.entries(scores).forEach(([axis, value]) => {
    total[axis] = (total[axis] || 0) + value;
  });
  return total;
}

function calculateResult() {
  const totals = {};
  answers.forEach((answerIndex, questionIndex) => {
    addScores(totals, questions[questionIndex].answers[answerIndex].scores);
  });

  const topAxes = Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([axis]) => axis);

  const match = eyeTypes.find(type =>
    topAxes.every(axis => type.axes.includes(axis))
  ) || eyeTypes.find(type => type.axes.includes(topAxes[0])) || eyeTypes[0];

  return { match, totals, topAxes };
}

function renderResult() {
  const { match, totals, topAxes } = calculateResult();
  progressBar.style.width = "100%";
  questionArea.classList.add("hidden");
  resultArea.classList.remove("hidden");
  restartBtn.classList.remove("hidden");
  prevBtn.classList.add("hidden");

  const sortedAxes = Object.entries(totals).sort((a, b) => b[1] - a[1]);

  resultArea.innerHTML = `
    <div class="result-card">
      <p class="eyebrow">나의 눈BTI 결과</p>
      <h2>${match.name}</h2>
      <p class="lead">${match.summary}</p>
      <div class="keywords">${match.keywords.map(keyword => `<span>${keyword}</span>`).join("")}</div>
      <p>${match.description}</p>
      <p><strong>강점:</strong> ${match.strength}</p>
      <p><strong>균형 포인트:</strong> ${match.watch}</p>
      <p><strong>추천 콘텐츠:</strong> ${match.video}</p>
      <p><strong>주요 축:</strong> ${topAxes.map(axis => axisLabels[axis]).join(" + ")}</p>
      <div class="keywords">${sortedAxes.map(([axis, score]) => `<span>${axisLabels[axis]} ${score}</span>`).join("")}</div>
      <p>이 결과는 눈의 인상과 자가 응답을 바탕으로 한 재미용 성향 콘텐츠이며, 의학적 진단이나 성격의 절대 판정이 아닙니다.</p>
      <a class="button secondary" href="#type-${match.slug}">내 유형 자세히 보기</a>
    </div>
  `;
}

questionArea.addEventListener("click", event => {
  const button = event.target.closest("[data-answer]");
  if (!button) return;
  answers[current] = Number(button.dataset.answer);
  current += 1;
  if (current >= questions.length) {
    renderResult();
  } else {
    renderQuestion();
  }
});

prevBtn.addEventListener("click", () => {
  if (current === 0) return;
  current -= 1;
  answers.pop();
  renderQuestion();
});

restartBtn.addEventListener("click", () => {
  current = 0;
  answers = [];
  renderQuestion();
});

loadData().then(() => {
  renderTypes();
  renderQuestion();
});
