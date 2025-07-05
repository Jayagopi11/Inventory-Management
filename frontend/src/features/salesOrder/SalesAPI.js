import axios from "axios";

const API_URL = "http://localhost:5000/api/sales";

export const fetchSalesOrdersAPI = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addSalesOrderAPI = async (order) => {
  const response = await axios.post(API_URL, order);
  return response.data;
};

export const updateSalesOrderAPI = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteSalesOrderAPI = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
