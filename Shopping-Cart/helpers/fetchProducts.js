const fetchProducts = async (QUERY) => { // usando async para esperar a promisse;
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();// converter para json;
    return data;
  } catch (error) {
    console.log('error', error.message);
    return error.message;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
} 
 // Código desenvolvido com a ajuda de Isabela Aro; 

/* const fetchProducts = (QUERY) => {
  const f = fetch(`https://api.mercadolibre.com/v2/products?q=${QUERY}`)
  .then((response) => response.json())
  .then((data) => data)
  .catch ((error) => error);
  return f;
}

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
// Código desenvolvido com ajuda de Guilherme Aquino; */
