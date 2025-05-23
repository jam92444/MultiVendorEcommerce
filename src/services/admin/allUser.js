export const getAllUsers = async () => {
  try {
    const response = await fetch("https://66c432c4b026f3cc6cee532c.mockapi.io/users");

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
