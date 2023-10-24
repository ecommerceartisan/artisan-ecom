import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  // Initialize the 'categories' state variable as an empty array.
  const [categories, setCategories] = useState([]);

  // Define a function to retrieve categories from an API.
  const getCategories = async () => {
    try {
      // Make an Axios GET request to fetch categories from the API.
      const { data } = await axios.get("/api/v1/category/get-category");

      // Update the 'categories' state with the fetched category data.
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  // Use 'useEffect' to fetch categories when the component mounts.
  useEffect(() => {
    getCategories();
  }, []);

  // Return the 'categories' state, which can be used by components.
  return categories;
}
