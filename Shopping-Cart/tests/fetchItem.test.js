require("../mocks/fetchSimulator");
const { fetchItem } = require("../helpers/fetchItem");
const item = require("../mocks/item");

describe("2 - Teste a função fetchItem", () => {
  it("Verifica se fetchItem é uma function.", () => {
    expect(typeof fetchItem).toBe("function");
  });
  it('Verifique se ao passar o argumento do item "MLB1615760527" fetch é chamada.', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
    //https://jestjs.io/pt-BR/docs/espect#tohavebeemcalled
  });
  it('Verifica se ao passar o argumento do item "MLB1615760527" a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527";', async () => {
    await fetchItem('MLB1615760527');
    const url = "https://api.mercadolibre.com/items/MLB1615760527";
    expect(fetch).toHaveBeenCalledWith(url);
  });
  it('Verifique se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo.', async () => {
    const obj = await fetchItem('MLB1615760527');
    expect(obj).toBe(item);
  });
  it('Verifica se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    expect(await fetchItem()).toEqual('You must provide an url');
  });
}); /* Código desenvolvido com ajuda de Isabela Aro */
