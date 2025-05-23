const getUser = async (email, password) => {
  try {
    const res = await fetch(
      "https://66c432c4b026f3cc6cee532c.mockapi.io/users"
    );
    const users = await res.json();

    // Match user credentials
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    return user || null;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return null;
  }
};

const createUser = async (userData) => {
  try {
    const res = await fetch(
      "https://66c432c4b026f3cc6cee532c.mockapi.io/users",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      }
    );
    if (!res.ok) throw new Error("Failed to create user");
    const newUser = await res.json();
    return newUser;
  } catch (error) {
    console.error("Signup error:", error);
    return null;
  }
};

const checkUserExists = async (email) => {
  try {
    const res = await fetch(
      `https://66c432c4b026f3cc6cee532c.mockapi.io/users?email=${email}`
    );
    const data = await res.json();
    return data.length > 0;
  } catch (error) {
    console.error("Check user error:", error);
    return false;
  }
};


export default getUser;
export {checkUserExists,createUser};