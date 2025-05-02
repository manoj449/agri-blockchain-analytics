export const addProduct = async (formData) => {
  const response = await fetch('http://localhost:5000/add_product', {
    method: 'POST',
    body: formData
  });
  if (!response.ok) throw new Error('Failed to add product');
  return response.json();
};

export const getChain = async () => {
  const response = await fetch('http://localhost:5000/get_chain');
  if (!response.ok) throw new Error('Failed to fetch chain');
  return response.json();
};

export const getProduct = async (id) => {
  const response = await fetch(`http://localhost:5000/get_product/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product');
  return response.json();
};