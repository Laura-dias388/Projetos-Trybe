import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import mockTest from './mockTest';

describe('Teste do componente App.', () => {

  test('Teste se a página principal contém um heading h2 com o texto `Planets`.', () => {
    global.fetch = jest.fn(async () => ({
      json: async () => (mockTest)
    }));
    render(<App />);

    const heading = screen.getByRole('heading', { name: /planets/i });
    expect(heading).toBeInTheDocument();
  });

  test('Teste se a página principal possuí os data-testid corretos.', () => {
    global.fetch = jest.fn(async () => ({
      json: async () => (mockTest)
    }));
    render(<App />);

    expect(screen.getByTestId("column-filter")).toBeInTheDocument();
    expect(screen.getByTestId("comparison-filter")).toBeInTheDocument();
    expect(screen.getByTestId("value-filter")).toBeInTheDocument();
    expect(screen.getByTestId("button-filter")).toBeInTheDocument();
    expect(screen.getByTestId("name-filter")).toBeInTheDocument();
  });

  test('Teste se a página principal contém um conjunto fixo de filtros de valores numéricos.', () => {
    global.fetch = jest.fn(async () => ({
      json: async () => (mockTest)
    }));
    render(<App />);

    const filter = screen.getByTestId("comparison-filter");
    expect(filter).toBeInTheDocument();
  });

  test('Teste se a página principal possuí os nomes corretos.', () => {
    global.fetch = jest.fn(async () => ({
      json: async () => (mockTest)
    }));
    render(<App />);
    
    expect(screen.getByRole('combobox', { name: /coluna:/i })).toBeInTheDocument();
    expect(screen.getByText(/comparação:/i)).toBeInTheDocument();
    expect(screen.getByText(/valor:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /filtrar/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', {  name: /digite sua pesquisa aqui:/i})).toBeInTheDocument();
  });

  test('Teste a maior que.', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => (mockTest)
    }));
    render(<App />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    const testButton = screen.getByRole('button', { name: /filtrar/i });

    expect(screen.getAllByRole('row')).toHaveLength(11);

    userEvent.selectOptions(screen.getByTestId("column-filter"), 'orbital_period');
    userEvent.selectOptions(screen.getByTestId("comparison-filter"), 'maior que');
    userEvent.type(screen.getByTestId("value-filter"), "500");
    userEvent.click(testButton);

    expect(testButton).toBeDefined();
    expect(screen.getAllByRole('row')).toHaveLength(4);
  });

  test('Teste menor que.', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => (mockTest)
    }));
    render(<App />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    const testButton = screen.getByRole('button', { name: /filtrar/i });

    expect(screen.getAllByRole('row')).toHaveLength(11);

    userEvent.selectOptions(screen.getByTestId("column-filter"), 'surface_water');
    userEvent.selectOptions(screen.getByTestId("comparison-filter"), 'menor que');
    userEvent.type(screen.getByTestId("value-filter"), "50");
    userEvent.click(testButton);

    expect(screen.getAllByRole('row')).toHaveLength(8);
  });

  test('Teste igual a.', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => (mockTest)
    }));
    render(<App />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    const testButton = screen.getByRole('button', { name: /filtrar/i });

    expect(screen.getAllByRole('row')).toHaveLength(11);

    userEvent.selectOptions(screen.getByTestId("column-filter"), 'orbital_period');
    userEvent.selectOptions(screen.getByTestId("comparison-filter"), 'igual a');
    userEvent.type(screen.getByTestId("value-filter"), "549");
    userEvent.click(testButton);

    expect(screen.getAllByRole('row')).toHaveLength(2);

  });

  test('Teste o input', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => (mockTest)
    }));
    render(<App />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    }); 

    userEvent.type(screen.getByTestId("name-filter"), "p");
    expect(screen.getAllByRole('row')).toHaveLength(2);

  });

  test('Teste o botão de deletar.', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => (mockTest)
    }));
    render(<App />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    }); 

    userEvent.type(screen.getByTestId("name-filter"), "p");
    expect(screen.getAllByRole('row')).toHaveLength(2);

  });
   
  test('Teste o botão de excluir.', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => (mockTest)
    }));
    render(<App />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    }); 

  });
});
