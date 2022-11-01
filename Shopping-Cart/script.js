const cart = document.querySelector('.cart__items');// captura a ol pela classe;
const getButton = document.querySelector('.empty-cart');// captura o botão esvaziar carrinho;
const container = document.querySelector('.container');// captura o container para adicionar a mensagem de "carregando...";
const priceAll = document.querySelector('.total-price');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const saveCartToLocalStorage = () => { // Código desenvolvido para salvar o item selecionado ao localStorage;
  saveCartItems(cart.innerHTML);// Captura o texto do carrinho de compras;
};// Código desenvolvido com ajuda de Ivan Martins Turma 23 Tribo B;

const getSkuFromProductItem = (item) => item.parentNode.firstChild.innerText;// Código desenvolvido para acessar primeiro o elemento pai, e depois acessar o primeiro filho;
// Código desenvolvido com a ajuda de Fábio Mateus Turma 23 Tribo - B;

const createAllPrice = () => {
  const getItemsOfLocalStore = getSavedCartItems();
  const itemsFormatte = getItemsOfLocalStore.match(/\$((?:\d|,)*\.?\d+)/g);// https://regexr.com/

  if (itemsFormatte !== null) {
    const runValue = itemsFormatte.map((item) => Number(item.replace('$', '')));
    const result = runValue.reduce((acc, num) => acc + num)
    .toLocaleString('pt-br', { maximumFractionDigits: 2 })
    .replace('.', '')
    .replace(',', '.');
    priceAll.innerText = result;
  } else {
    const num = 0;
    priceAll.innerText = num.toLocaleString('pt-br', { maximumFractionDigits: 2 });
  }
};// Código desenvolvido com ajuda de Guilherme Aquino Turma 23 Tribo A;

const cartItemClickListener = ({ target }) => { // Código que remove o item, clicando sobre o mesmo;
  if (target.className === 'cart__item') {
    target.remove();
    saveCartToLocalStorage();
    createAllPrice();
  }// Código desenvolvido com ajuda de Bruno Faraco Turma 23 Tribo A
};

const createCartItemElement = ({ id: sku, title: name, price: salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const getCartItemsToLocalStorage = () => { // Função que recupera o item do carrinho de compras;
 cart.innerHTML = getSavedCartItems();// Trás o texto salvo no localStorage;
};// Código desenvolvido com ajuda de Ivan Martins Turma 23 Tribo B;

const cleanCart = () => { // Código desenvolvido para o botao de limpar o carrinho de compras;
  cart.innerHTML = '';// Acessa o "cart"(carrinho), e pega seu texo e deixa o mesmo vazio;
  saveCartToLocalStorage();// Função chamada para limpar o carrinho de compras, após o item ter sido salvo no localStorage;
}; // Código desenvolvido com a ajuda de Fábio Mateus Turma 23 Tribo - B;

const createOl = async ({ target }) => { // Função desenvolvida para adicionar a li a lista ol;
  const getId = getSkuFromProductItem(target);// getId chama a função getSkuFromProductItem, com o parâmetro para acessar o elemento;
  const productInfo = await fetchItem(getId);// productInfo espera a resposta de fetchItem passando como parametro a const getId que ja possuí o elemento id; 
  const createLi = createCartItemElement(productInfo);
  cart.appendChild(createLi);
  saveCartToLocalStorage();
  createAllPrice();
}; // Código desenvolvido com a ajuda de Fábio Mateus Turma 23 Tribo - B;

const createProductItemElement = ({ id: sku, title: name, thumbnail: image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', createOl);
  section.appendChild(button);
  return section;
};

getButton.addEventListener('click', cleanCart);

const addLoading = () => { // Função criada para adicionar um text de "carregando..." a tela antes dos items serem carregados;
  const loading = createCustomElement('span', 'loading', 'carregando...');
  container.appendChild(loading);// Coloca a mensagem que está em loading como filha da tag container;
}; // Código desenvolvido com ajuda de Lucas Schneider Turma 23 Tribo A;

const showProduct = async () => { // Espera a promise da api;
  addLoading();// Adiciona a função addLoading para ser chamada antes que a pagina carregue;
  const comeFetch = await fetchProducts('computador');
  const createItem = document.querySelector('.items');
  comeFetch.results.forEach((items) => {
    const catchResult = createProductItemElement(items);
    createItem.appendChild(catchResult);
  });
  const selectElement = document.querySelector('.loading');
  selectElement.remove();
};// Código desenvolvido com ajuda de Guilherme Aquino Turma 23 Tribo A;

const addEventToCart = () => {
  const itemCart = document.querySelectorAll('.cart__item');
  Array.from(itemCart).forEach((element) => {
    element.addEventListener('click', cartItemClickListener);
    element.addEventListener('click', saveCartToLocalStorage);
  });
};// Código desenvolvido com ajuda de Ivan Martins Turma 23 Tribo B;

window.onload = async () => {
  showProduct();
  getCartItemsToLocalStorage();
  addEventToCart();
 };