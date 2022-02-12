const tableElementsContainer = document.querySelector(
  ".planet-table-elements-container"
);

const planetTabsContainer = document.querySelector(".planet-tabs-container");

export function drawTableElement(tableElementData) {
  const tableElement = document.createElement("div");

  if ("message" in tableElementData) {
    const message = document.createElement("span");
    message.innerText = tableElementData.message;
    message.classList.add("empty-planet-message");
    tableElement.appendChild(message);
  } else {
    const planetNameWrap = document.createElement("div");
    const planetNameText = document.createElement("span");
    planetNameText.innerText = tableElementData.planet;
    planetNameWrap.appendChild(planetNameText);

    const residentNameWrap = document.createElement("div");
    const residentNameText = document.createElement("span");
    residentNameText.innerText = tableElementData.resident;
    residentNameWrap.appendChild(residentNameText);

    const speciesNameWrap = document.createElement("div");
    const speciesNameText = document.createElement("span");
    speciesNameText.innerText = tableElementData.species;
    speciesNameWrap.appendChild(speciesNameText);

    tableElement.append(planetNameWrap, residentNameWrap, speciesNameWrap);
  }

  tableElementsContainer.appendChild(tableElement);
}

const loader = document.querySelector(".loader-bg");

export async function drawPlanetTable(planetDataRequest) {
  cleanPlanetTable();
  loader.classList.remove("hidden");
  planetTabsContainer.classList.add("hidden");
  let planetTableData = await planetDataRequest;

  for (let tableElementData of planetTableData) {
    drawTableElement(tableElementData);
  }
  loader.classList.add("hidden");
  planetTabsContainer.classList.remove("hidden");

  // document.querySelector(".planet-tab").classList.add("selected-planet-tab");
}

export function cleanPlanetTable() {
  tableElementsContainer.innerHTML = "";
}
