require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Verifique se fetchProducts é uma function.', () =>{
    expect(typeof fetchProducts).toBe('function');
  });
  it('Verifique se a função fetchProducts com o argumento "computador" e teste se fetch foi chamada.', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
    //https://jestjs.io/pt-BR/docs/espect#tohavebeemcalled
  });
  it('Teste se ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint.', () => {
    const point = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(point);
  });
  it('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  });
  it('Teste se ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    const message =  'You must provide an url'  
    expect(await fetchProducts()).toEqual(message);
  });
});
// Código desenvolvido com ajuda de Juliana Martinelli;