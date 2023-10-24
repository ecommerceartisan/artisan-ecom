import { useState, useContext, createContext, useEffect } from "react";

// Create a context for managing the shopping cart.
const CartContext = createContext();

// Create a provider component for managing the shopping cart state.
const CartProvider = ({ children }) => {
  // Initialize the 'cart' state variable with an empty array.
  const [cart, setCart] = useState([]);

  // Use 'useEffect' to check for existing cart items in local storage.
  useEffect(() => {
    // Attempt to retrieve existing cart items from local storage.
    let existingCartItem = localStorage.getItem("cart");

    // If cart items are found in local storage, update the 'cart' state with them.
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, []);

  return (
    // Provide the 'cart' state and 'setCart' function to child components via the 'CartContext'.
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook for accessing the shopping cart context.
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
