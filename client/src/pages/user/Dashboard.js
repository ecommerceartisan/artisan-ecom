import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();

  // Destructure the address object
  const { buildingHouseNo, street, barangay, city, province, region } =
    auth?.user?.address || {};

  // Concatenate address properties into a string
  const formattedAddress = `${buildingHouseNo}, ${street}, ${barangay}, ${city}, ${province}, ${region}`;

  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>{auth?.user?.name}</h3>
              <h3>{auth?.user?.email}</h3>
              {/* Display formatted address string */}
              <h3>{formattedAddress}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
