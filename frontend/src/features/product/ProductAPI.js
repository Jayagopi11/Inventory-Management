import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/products';

export const fetchProducts = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const addProduct = async (product) => {
  const res = await axios.post(BASE_URL, product, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await axios.put(`${BASE_URL}/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};
