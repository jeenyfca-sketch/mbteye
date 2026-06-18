const typeGrid = document.querySelector("#typeGrid");

let eyeTypes = [];

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

loadData().then(renderTypes);
