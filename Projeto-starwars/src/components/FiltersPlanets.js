import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function FiltersPlanets() {
  const { setFilterByName } = useContext(PlanetContext);

  const filter = (event) => {
    const { value } = event.target;
    setFilterByName({ name: value });
  }; // requisito feito com ajuda de Jordam Mendes Turma 23 Tribo A;

  return (
    <div>
      <h2>Digite sua pesquisa aqui:</h2>
      <input
        name="name"
        type="text"
        data-testid="name-filter"
        placeholder="escreva aqui"
        onChange={ filter }
      />
    </div>

  );
}

export default FiltersPlanets;
