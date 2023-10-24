import React from "react";

// This is a functional component called CategoryForm.
// It takes three props as input: handleSubmit, value, and setValue.
const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      {/* This is a form element, and when it's submitted, the handleSubmit function will be called. */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          {/* This is an input field where the user can type a new category.
             The value prop is set to the 'value' prop passed to this component.
             When the user types in the input field, the 'setValue' function is called to update the 'value' prop. */}
          <input
            type="text"
            className="form-control"
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        {/* This is a button that, when clicked, will trigger the form submission. */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

// This component is exported to be used in other parts of the application.
export default CategoryForm;
