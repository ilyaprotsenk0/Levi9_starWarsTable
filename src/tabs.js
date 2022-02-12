import { getPlanetData } from "./data";
import { drawPlanetTable } from "./table";

const planetTabsContainer = document.querySelector(".planet-tabs-container");

export function drawTab(value) {
  const tab = document.createElement("div");
  tab.classList.add("planet-tab");
  tab.setAttribute("data-planet", value);

  const tabText = document.createElement("span");
  tabText.innerText = `${value}`;

  tab.appendChild(tabText);
  planetTabsContainer.appendChild(tab);
}

export function enableTabChange() {
  const tabs = document.querySelectorAll(".planet-tab");
  let lastSelectedTab = tabs[0];

  if (tabs.length) {
    tabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        if (lastSelectedTab) {
          lastSelectedTab.classList.remove("selected-planet-tab");
        }

        tab.classList.add("selected-planet-tab");
        lastSelectedTab = tab;
      });
    });
  }
}

export function enableTableDrawOnTabChange() {
  const tabs = document.querySelectorAll(".planet-tab");
  if (tabs.length) {
    tabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        const planetValue = tab.getAttribute("data-planet");
        drawPlanetTable(
          getPlanetData(`https://swapi.dev/api/planets/${planetValue}/`)
        );
      });
    });
  }
}

export function drawAllPlanetTabs() {
  for (let i = 1; i <= 10; i++) {
    drawTab(i);
  }
}
