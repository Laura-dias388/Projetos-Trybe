/* const fetchItem = async (id) => {
  const promise = await fetch(`https://api.mercadolibre.com/items/${id}`);
  console.log(promise);
  const obj = await promise.json();
  return obj;
}; */
const fetchItem = async (id) => {
  const url = `https://api.mercadolibre.com/items/${id}`;
  try {
    const response1 = await fetch(url);
    const data1 = await response1.json();
    return data1;
  } catch (error) {
    return error.message;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
} /* Código desenvolvido com ajuda de Fábio Mateus Turma 23 Tribo B */
