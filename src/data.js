export async function getPlanetData(planetUrl) {
  try {
    const planetResponse = await fetch(planetUrl);
    const planetData = await planetResponse.json();
    const resultData = [];

    if (planetData.residents.length) {
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
    } else {
      resultData.push({
        message: `Planet ${planetData.name} have no residents`,
      });
    }

    return resultData;
  } catch {
    console.info("Failed to load planet data");
  }
}
