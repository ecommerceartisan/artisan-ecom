import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  // Access the 'auth' context using the 'useAuth' hook.
  const [auth] = useAuth();

  // Destructure the address object
  const { buildingHouseNo, street, barangay, city, province, region } =
    auth?.user?.address || {};

  // Concatenate address properties into a string
  const formattedAddress = `${buildingHouseNo}, ${street}, ${barangay}, ${city}, ${province}, ${region}`;

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h4>Admin Name: {auth?.user?.name}</h4>
              <h4>Admin Email: {auth?.user?.email}</h4>
              <h4>Admin Contact: {auth?.user?.phone}</h4>
              {/* Display formatted address string */}
              <h4>Admin Address: {formattedAddress}</h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
