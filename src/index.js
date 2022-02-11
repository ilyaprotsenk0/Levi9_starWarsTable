import "./styles/index.css";
import "../index.html";

const planetUrlTemplate = "https://swapi.dev/api/planets";

// Получить ссылки всех существующих планет

const planetsUrls = [];

for (let i = 1; i <= 60; i++) {
  planetsUrls.push(`${planetUrlTemplate}/${i}/`);
}

console.log(planetsUrls);

// Получить результат резидентов и спешис по нажатию на кнопку

async function getPlanetData(planetUrl) {
  try {
    const planetResponse = await fetch(planetUrl);
    const planetData = await planetResponse.json();
    const resultData = [];

    for (let residentUrl of planetData.residents) {
      try {
        const residentResponse = await fetch(residentUrl);
        const residentData = await residentResponse.json();

        if (residentData.species.length) {
          try {
            const speciesResponse = await fetch(residentData.species);
            const speciesData = await speciesResponse.json();
            resultData.push({
              planet: planetData.name,
              resident: residentData.name,
              species: speciesData.name,
            });
          } catch {
            console.info(`Failed to load ${residentData.name}`);
          }
        } else {
          resultData.push({
            planet: planetData.name,
            resident: residentData.name,
            species: "Human",
          });
        }
      } catch {
        console.info(`Failed to load ${planetData.name} resident`);
      }
    }

    return resultData;
  } catch {
    console.info("Failed to load planet data");
  }
}

let residentsContainer = document.querySelector(".residents-container");

function drawResidentsTableElement(residentData) {
  console.log(residentData);
  let elementWrap = document.createElement("div");

  let planetNameWrap = document.createElement("div");
  let planetNameText = document.createElement("span");
  planetNameText.innerText = residentData.planet;
  planetNameWrap.appendChild(planetNameText);

  let residentNameWrap = document.createElement("div");
  let residentNameText = document.createElement("span");
  residentNameText.innerText = residentData.resident;
  residentNameWrap.appendChild(residentNameText);

  let speciesNameWrap = document.createElement("div");
  let speciesNameText = document.createElement("span");
  speciesNameText.innerText = residentData.species;
  speciesNameWrap.appendChild(speciesNameText);

  elementWrap.append(planetNameWrap, residentNameWrap, speciesNameWrap);
  residentsContainer.appendChild(elementWrap);
}

function drawResidentsTable(residentsData) {
  for (let resident of residentsData) {
    drawResidentsTableElement(resident);
  }
}

const loadingStatusElement = document.querySelector("#loading-status");

document.onload = (async function () {
  loadingStatusElement.innerText = "Loading...";
  drawResidentsTable(await getPlanetData(planetsUrls[54]));
  loadingStatusElement.innerText = "";
})();
