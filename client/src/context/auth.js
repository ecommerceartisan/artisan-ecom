import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

// Create an authentication context using createContext.
const AuthContext = createContext();

// Create an authentication provider component.
const AuthProvider = ({ children }) => {
  // Initialize the auth state with user and token information.
  const [auth, setAuth] = useState({
    user: null,  // Represents the user object (typically containing user data).
    token: "",   // Represents the authentication token (e.g., JWT) used for API requests.
  });

  // Set the default Axios Authorization header with the auth token.
  axios.defaults.headers.common['Authorization'] = auth?.token;

  // Use useEffect to check for saved authentication data in local storage.
  useEffect(() => {
    // Attempt to retrieve authentication data from local storage.
    const data = localStorage.getItem('auth');

    // If authentication data is found in local storage:
    if (data) {
      // Parse the stored data to extract the user and token information.
      const parsedData = JSON.parse(data);

      // Update the auth state with the stored user and token.
      setAuth({
        ...auth,
        user: parsedData.user,
        token: parsedData.token,
      });
    }
  }, []);

  return (
    // Provide the auth state and setAuth function to child components via the AuthContext.
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook for accessing the authentication context.
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
