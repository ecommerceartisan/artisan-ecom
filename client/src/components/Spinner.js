import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  // State variable 'count' is used to display the countdown timer.
  const [count, setCount] = useState(3);

  // The 'navigate' function allows for programmatic navigation.
  const navigate = useNavigate();

  // The 'location' object represents the current location.
  const location = useLocation();

  useEffect(() => {
    // Create an interval to decrement the 'count' state variable every second.
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);

    // When the countdown reaches 0, navigate to the specified path.
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });

    // Clear the interval to stop the countdown when the component unmounts.
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h1 className="text-center">
          Redirecting to you in {count} second
        </h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
