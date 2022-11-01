import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';
import fetchPlanets from '../RequestAPI/fetchAPI';

export const arrayFilter = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water'];

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [newPlanets, setNewPlanets] = useState(planets);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setfilterByNumericValues] = useState([]);
  const [filterOnly, setfilterOnly] = useState(arrayFilter);

  useEffect(() => {
    const resAPI = async () => {
      const resp = await fetchPlanets();
      const notResidents = resp.map((element) => {
        delete element.residents;
        return element;
      });
      setPlanets(notResidents);
    };
    resAPI();
  }, []);

  useEffect(() => { // requisito feito com ajuda de Gabriel Gonçalves Turma 23 Tribo A;
    const { name } = filterByName;
    const filterPlanet = planets
      .filter((item) => item.name.toLowerCase().includes(name.toLowerCase()));
    setNewPlanets(filterPlanet);
  }, [planets, filterByName]);

  useEffect(() => {
    setNewPlanets(planets);
  }, [planets]);

  useEffect(() => { // Requisito desenvolvido com ajuda de Gabriel Gonçalves Turma 23 Tribo A;
    filterByNumericValues.forEach(({ column, comparison, value }) => {
      const filterPlanet = newPlanets
        .filter((item) => {
          if (comparison === 'maior que') {
            return Number(item[column]) > Number(value);
          }
          if (comparison === 'menor que') {
            return Number(item[column]) < Number(value);
          }
          return Number(item[column]) === Number(value);
        });
      setNewPlanets(filterPlanet);
    });
    if (filterByNumericValues.length === 0) setNewPlanets(planets);
  }, [filterByNumericValues]);

  const respPlanet = {
    planets,
    setPlanets,
    newPlanets,
    setNewPlanets,
    filterOnly,
    setfilterOnly,
    filterByName,
    setFilterByName,
    filterByNumericValues,
    setfilterByNumericValues,
  };

  return ( // entrega o estado para todos os components;
    <PlanetContext.Provider value={ respPlanet }>
      {children}
    </PlanetContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
