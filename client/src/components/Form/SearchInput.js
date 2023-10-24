import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  // This component utilizes the useSearch hook to access and modify search-related data.
  const [values, setValues] = useSearch();

  // The useNavigate hook provides a way to navigate to different routes within the app.
  const navigate = useNavigate();

  // When the user submits the search form, this function is called.
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // It sends a request to a backend API with the search keyword from the 'values' state.
      const { data } = await axios.get(`/api/v1/product/search/${values.keyword}`);

      // The results received from the API are stored in the 'results' property of 'values'.
      setValues({ ...values, results: data });

      // Finally, it navigates to a new route ("/search") using the 'navigate' function from react-router-dom.
      navigate("/search");
    } catch (error) {
      // If there's an error in the API request, it's logged to the console for debugging.
      console.log(error);
    }
  };

  return (
    <div>
      {/* This is a search form with an input field and a "Search" button. */}
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          // When the user types in the input field, it updates the 'keyword' in 'values'.
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

// Export the SearchInput component for use in other parts of the application.
export default SearchInput;
