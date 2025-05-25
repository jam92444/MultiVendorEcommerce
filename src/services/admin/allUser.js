
const USER_API_URL = "https://66c432c4b026f3cc6cee532c.mockapi.io/users"

export const getAllUsers = async () => {
  try {
    const response = await fetch(USER_API_URL);

    // Handle 404 or unexpected content
    if (!response.ok) {
      console.error("Error: Status", response.status);
      return [];
    }

    const data = await response.json();

    // Ensure it's an array
    if (!Array.isArray(data)) {
      console.error("Unexpected response format:", data);
      return [];
    }

    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};


export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${USER_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
};
