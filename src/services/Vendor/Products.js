import axios from "axios";

const API_URL = 'https://66c432c4b026f3cc6cee532c.mockapi.io/products'

const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete product:", error);
    throw error;
  }
};
const allProducts = async () => {
  try {
    const response = await axios.get(API_URL);

    const data = response.data;

    if (!data) {
      return "No data found";
    }
    return data;
  } catch (error) {
    return error;
  }
};

export { allProducts ,deleteProduct};
