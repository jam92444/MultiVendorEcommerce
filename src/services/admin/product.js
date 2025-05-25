// src/services/admin/product.js
import axios from "axios";

const API_URL = "https://66c432c4b026f3cc6cee532c.mockapi.io/products";


export const approveProduct = async (id, updatedProduct) => {
  return axios.put(`${API_URL}/${id}`, updatedProduct);
};


export const rejectProduct = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
