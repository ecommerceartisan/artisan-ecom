import { useState, useContext, createContext } from "react";

// Create a context for managing search-related data.
const SearchContext = createContext();

// Create a provider component for managing the search state.
const SearchProvider = ({ children }) => {
  // Initialize the 'auth' state variable with initial keyword and search results.
  const [auth, setAuth] = useState({
    keyword: "",   // Represents the search keyword.
    results: [],   // Represents the search results.
  });

  return (
    // Provide the 'auth' state and 'setAuth' function to child components via the 'SearchContext'.
    <SearchContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchContext.Provider>
  );
};

// Create a custom hook for accessing the search context.
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
