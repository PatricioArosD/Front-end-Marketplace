import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext"; // Import UserContext

export const ApiContext = createContext();

const ApiProvider = ({ children }) => {
  const { user, token } = useContext(UserContext); // Get user and token from UserContext
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  axios.defaults.baseURL = "http://localhost:3000"; // Set the base URL for API calls

  const url = "/productos"; // Correct path to productos.json in the public directory
  const getData = async () => {
    try {
      const response = await axios.get(url);
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = response.data;
      setProducts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const fetchFavorites = async (userId, token) => {
    try {
      const response = await axios.get(`/likes/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const likesData = Array.isArray(response.data.likes) ? response.data.likes : [];
      const favoriteProducts = likesData.map((like) => {
        const product = products.find((product) => product.id === like.product_id);
        return { ...product, like_id: like.id, user_id: like.user_id }; // Include the like ID and user ID in the favorite object
      });
      setFavorites(favoriteProducts);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const refreshFavorites = async (token) => {
    try {
      const response = await axios.get("/likes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFavorites(response.data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const addFavorite = async (userId, productId, token) => {
    try {
      // Check if the product is already in favorites
      const existingFavorite = favorites.find(favorite => favorite.product_id === productId);
      if (existingFavorite) {
        throw new Error("Product is already in favorites");
      }

      const response = await axios.post(
        "/likes",
        { user_id: userId, product_id: productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchFavorites(userId, token); // Refresh favorites after adding
      return response.data.id; // Return the new like ID
    } catch (error) {
      console.error("Error adding favorite:", error);
      throw error;
    }
  };

  const removeFavorite = async (likeId, userId, token) => {
    try {
      await axios.delete(`/likes/${likeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchFavorites(userId, token); // Refresh favorites after removing
    } catch (error) {
      console.error("Error removing favorite:", error);
      throw error;
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (products.length > 0 && user) {
      fetchFavorites(user.id, token);
    }
  }, [products, user, token]);

  // Function to refresh products
  const refreshProducts = () => {
    getData();
  };

  return (
    <ApiContext.Provider value={{ products, setProducts, refreshProducts, favorites, fetchFavorites, addFavorite, removeFavorite }}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;