import { createContext, useEffect, useState } from "react";
import { getAllUsers } from "../services/admin/allUser";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [allUser, setAllUser] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const currency = "₹";

  const products = [
    {
      id: 1,
      title: "Wireless Bluetooth Headphones",
      description:
        "High-quality sound with noise cancellation and long battery life.",
      price: 59.99,
      discount: 10,
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lfGVufDB8fDB8fHww",
      rating: 4.5,
      stock: 120,
    },
    {
      id: 2,
      title: "Men's Slim Fit T-Shirt",
      description: "Soft cotton t-shirt with modern fit and comfortable feel.",
      price: 19.99,
      discount: 0,
      category: "Apparel",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      rating: 4.2,
      stock: 200,
    },
    {
      id: 3,
      title: "Smartwatch Series 5",
      description:
        "Track your fitness, notifications, and more with this waterproof smartwatch.",
      price: 149.99,
      discount: 15,
      category: "Wearables",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      rating: 4.7,
      stock: 75,
    },
    {
      id: 4,
      title: "Leather Backpack",
      description:
        "Stylish leather backpack with multiple compartments and a laptop sleeve.",
      price: 89.99,
      discount: 5,
      category: "Bags",
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
      rating: 4.3,
      stock: 60,
    },
    {
      id: 5,
      title: "Running Shoes - Men",
      description:
        "Lightweight, breathable shoes designed for comfort and speed.",
      price: 79.99,
      discount: 20,
      category: "Footwear",
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
      rating: 4.6,
      stock: 100,
    },
  ];

  // Keep cart synced with localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Optional: re-sync cart on reload
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    const routeMap = {
      admin: "#/admin/dashboard",
      vendor: "#/vendor/dashboard",
      user: "#/",
    };

    const targetPath = routeMap[user.role] || "/";
    if (window.location.pathname !== targetPath) {
      window.location.href = targetPath;
    }
  }, [user]);

  const addToCart = (item) => {
    const selectedSize = item.selectedSize || "default";
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (cartItem) =>
          cartItem.id === item.id && cartItem.selectedSize === selectedSize
      );

      if (existingIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, { ...item, selectedSize, quantity: 1 }];
      }
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setAllUser(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const value = {
    user,
    setUser,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    logout,
    addToCart,
    cart,
    setCart,
    products,
    allUser,
    setAllUser,
    currency,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
