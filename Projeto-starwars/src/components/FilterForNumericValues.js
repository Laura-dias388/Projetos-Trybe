import React, { useState, useContext, useEffect } from 'react';
import PlanetContext from '../context/PlanetContext';
import { arrayFilter } from '../context/Provider';

function FilterForNumericValues() {
  const {
    planets,
    setfilterOnly,
    filterByNumericValues,
    setfilterByNumericValues,
    setNewPlanets,
    filterOnly } = useContext(PlanetContext);
  const [columnGet, setColumnGet] = useState('population');
  const [comparisonGet, setComparisonGet] = useState('maior que');
  const [valueGet, setValueGet] = useState(0);

  const filterEvent = (value, callback) => {
    callback(value);
  };

  const clickButton = () => {
    setfilterByNumericValues((prevState) => (
      [...prevState, {
        column: columnGet,
        comparison: comparisonGet,
        value: valueGet,
      }]
    ));
    setfilterOnly((prevState) => (
      prevState.filter((item) => item !== columnGet)
    ));
  };

  useEffect(() => { // oberservando se o array filterOnly muda;
    setColumnGet(filterOnly[0]);// requisitos feitos com ajuda de Gabriel Gonçalves Turma 23 Tribo A;
    setValueGet(0);
  }, [filterOnly]);

  const deleteButton = () => {
    setfilterByNumericValues([]);
    setNewPlanets(planets);
    setfilterOnly(arrayFilter);
  };

  const deleteOnly = (column) => { // cada item é um objeto com tres chaves, uma é a column;
    setNewPlanets(planets);
    setfilterByNumericValues((prevState) => prevState
      .filter((item) => item.column !== column));
    setfilterOnly((prevState) => [...prevState, column]);// retorna tudo de antes mais column;
  };

  return (
    <div>
      <h2>Filtros</h2>
      <label htmlFor="column">
        Coluna:
        <select
          value={ columnGet }
          data-testid="column-filter"
          name="column"
          id="column"
          onChange={ ({ target: { value } }) => filterEvent(value, setColumnGet) }
        >
          {filterOnly.map((item) => (
            <option key={ item } name={ item } value={ item }>{ item }</option>
          ))}
        </select>
      </label>
      <label htmlFor="comparison">
        Comparação:
        <select
          value={ comparisonGet }
          data-testid="comparison-filter"
          name="comparison"
          id="comparison"
          onChange={ ({ target: { value } }) => filterEvent(value, setComparisonGet) }
        >
          <option name="maior que" value="maior que">maior que</option>
          <option name="menor que" value="menor que">menor que</option>
          <option name="igual a" value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value">
        Valor:
        <input
          value={ valueGet }
          data-testid="value-filter"
          name="value"
          type="number"
          id="value"
          onChange={ ({ target: { value } }) => filterEvent(value, setValueGet) }
        />
      </label>
      <button
        name="button"
        type="button"
        data-testid="button-filter"
        onClick={ clickButton }
      >
        Filtrar
      </button>
      <div>
        {filterByNumericValues.map(({ column, comparison, value }) => (
          <div data-testid="filter" key={ column }>
            <p>{`${column} ${comparison} ${value}`}</p>
            <button onClick={ () => deleteOnly(column) } type="button">Excluir</button>
          </div>
        ))}
      </div>
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ deleteButton }
      >
        Excluir Todos
      </button>
    </div>
  );
}

export default FilterForNumericValues;
