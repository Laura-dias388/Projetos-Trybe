const saveCartItems = (items) => {
  localStorage.setItem('cartItems', items);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
// Código desenvolvido com ajuda de Guilherme Aquino;
