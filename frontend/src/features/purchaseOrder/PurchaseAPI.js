import axios from 'axios';

const API_URL = 'http://localhost:5000/api/purchases';

export const fetchPurchases = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addPurchase = async (purchaseData, token) => {
  const response = await axios.post(
    'http://localhost:5000/api/purchases',
    purchaseData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export const updatePurchase = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deletePurchase = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
