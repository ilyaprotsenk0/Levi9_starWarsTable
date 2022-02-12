import "./styles/index.css";
import "../index.html";
import { getPlanetData } from "./data";
import { drawPlanetTable } from "./table";
import {
  drawAllPlanetTabs,
  enableTabChange,
  enableTableDrawOnTabChange,
} from "./tabs";

drawAllPlanetTabs();
enableTabChange();
enableTableDrawOnTabChange();

(document.onload = function () {
  drawPlanetTable(getPlanetData("https://swapi.dev/api/planets/1/"));
  document.querySelector(".planet-tab").classList.add("selected-planet-tab");
})();
