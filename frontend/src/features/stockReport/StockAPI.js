import axios from "axios";

export const fetchStockAPI = async () => {
  const response = await axios.get("http://localhost:5000/api/stock");
  return response.data;
};
