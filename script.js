const typeGrid = document.querySelector("#typeGrid");
const wizard = document.querySelector(".nbti-wizard");
const mbtiText = document.querySelector("#mbtiText");

let eyeTypes = [];
let answers = { distance: "", structure: "", density: "", stressRings: 0 };

async function loadData() {
  const typesRes = await fetch("./data/eye-types.json");
  eyeTypes = await typesRes.json();
}

function renderTypes() {
  if (!typeGrid) return;

  typeGrid.innerHTML = eyeTypes.map(type => `
    <article class="type-card" id="type-${type.slug}">
      <strong>${type.name}</strong>
      <h3>${type.summary}</h3>
      <p>${type.description}</p>
      <div class="keywords">${type.keywords.map(keyword => `<span>${keyword}</span>`).join("")}</div>
    </article>
  `).join("");
}

function showWizardPage(pageName) {
  if (!wizard) return;

  wizard.querySelectorAll(".wizard-page").forEach(page => {
    page.classList.toggle("active", page.dataset.page === pageName);
  });

  if (pageName === "result") {
    showResult();
  }
}

function calculateNunBTI(distance, structure, density, stressRings) {
  const validDistance = ["넓음", "좁음"];
  const validStructure = ["굵고 뚜렷함", "가늘고 흐릿함"];
  const validDensity = ["치밀함", "느슨함"];

  if (!validDistance.includes(distance) || !validStructure.includes(structure) || !validDensity.includes(density)) {
    return "----";
  }

  const ringCount = Number(stressRings);
  if (!Number.isFinite(ringCount) || ringCount < 0) {
    return "----";
  }

  return [
    distance === "넓음" ? "E" : "I",
    structure === "굵고 뚜렷함" ? "S" : "N",
    density === "치밀함" ? "T" : "F",
    ringCount >= 3 ? "J" : "P"
  ].join("");
}

function showResult() {
  if (!mbtiText) return;
  mbtiText.textContent = calculateNunBTI(
    answers.distance,
    answers.structure,
    answers.density,
    answers.stressRings
  );
}

function restartWizard() {
  answers = { distance: "", structure: "", density: "", stressRings: 0 };
  showWizardPage("intro");
}

if (wizard) {
  wizard.addEventListener("click", event => {
    const nextButton = event.target.closest("[data-next-page]");
    const restartButton = event.target.closest("[data-restart-wizard]");

    if (restartButton) {
      restartWizard();
      return;
    }

    if (!nextButton) return;

    const key = nextButton.dataset.answerKey;
    const value = nextButton.dataset.answerValue;

    if (key) {
      answers[key] = key === "stressRings" ? Number(value) : value;
    }

    showWizardPage(nextButton.dataset.nextPage);
  });
}

loadData().then(renderTypes);
