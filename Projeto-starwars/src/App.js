import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Table from './components/Table';
import FiltersPlanets from './components/FiltersPlanets';
import FilterForNumericValues from './components/FilterForNumericValues';

function App() {
  return (
    <Provider>
      <span>
        <h1>STAR WARS</h1>
      </span>
      <FiltersPlanets />
      <FilterForNumericValues />
      <Table />
    </Provider>
  );
}

export default App;
