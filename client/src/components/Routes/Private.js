import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  // State variable 'ok' is used to determine whether the user is authorized.
  const [ok, setOk] = useState(false);
  
  // Retrieve authentication-related data and functions using the 'useAuth' hook.
  const [auth, setAuth] = useAuth();

  // useEffect hook runs when the component mounts or when 'auth.token' changes.
  useEffect(() => {
    // Asynchronously check for user authentication by making an HTTP request.
    const authCheck = async () => {
      const res = await axios.get("/api/v1/auth/user-auth");
      
      // If the response indicates the user is authenticated, set 'ok' to true.
      if (res.data.ok) {
        setOk(true);
      } else {
        // If not authenticated, set 'ok' to false.
        setOk(false);
      }
    };

    // If the user has a valid token, initiate the authentication check.
    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  // Conditional rendering: If 'ok' is true, render the route content (Outlet).
  // If 'ok' is false, display a loading spinner (Spinner).
  return ok ? <Outlet /> : <Spinner />;
}
