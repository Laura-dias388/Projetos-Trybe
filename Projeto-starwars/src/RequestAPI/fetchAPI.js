const fetchPlanets = async () => {
  const url = 'https://swapi.dev/api/planets';
  const response = await fetch(url);
  const resultPlanet = await response.json();
  return resultPlanet.results;
};

export default fetchPlanets;
