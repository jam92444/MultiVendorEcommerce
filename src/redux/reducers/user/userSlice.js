import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://66c432c4b026f3cc6cee532c.mockapi.io/users";

// login
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const { data: users } = await axios.get(API_URL);
      const user = users.find(
        (u) => u.email === email && u.password === password
      );
      if (!user) return thunkAPI.rejectWithValue("Invalid email or password");
      if (user.blocked === "true")
        return thunkAPI.rejectWithValue("Your account is blocked");

      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (err) {
      return thunkAPI.rejectWithValue("Login failed. Try again later.");
    }
  }
);

// signup
export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (newUser, thunkAPI) => {
    try {
      const { data } = await axios.post(API_URL, newUser);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Signup failed.");
    }
  }
);

// Load user from Local Storage
export const loadUserFromStorage = createAsyncThunk(
  "user/loadUserFromStorage",
  async () => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  }
);

//Logout and save cart data to backend
export const logoutUserAndSaveCart = createAsyncThunk(
  "user/logoutUserAndSaveCart",
  async ({ user, cart }, thunkAPI) => {
    try {
      if (user && user.id) {
        // Send PUT request to update user with cart
        await axios.put(`${API_URL}/${user.id}`, {
          ...user,
          cart: cart || [], // Make sure to send cart or empty array
        });
      }
      // Clear localStorage after successful save
      localStorage.removeItem("user");
      localStorage.removeItem("cart"); // Assuming you store cart here

      return null; // user is logged out
    } catch (error) {
      return thunkAPI.rejectWithValue("Logout failed to save cart");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUserDirectly: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SIGNUP
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOAD USER
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // LOGOUT AND SAVE CART
      .addCase(logoutUserAndSaveCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUserAndSaveCart.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutUserAndSaveCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUserDirectly } = userSlice.actions;
export default userSlice.reducer;
