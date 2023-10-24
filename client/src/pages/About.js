import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Artisan Ecommerce"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            Artisan Ecommerce About
          </p>
        </div>
      </div>
    </Layout>
  );
};

// Default props for the Layout component. These will be used if not provided explicitly.
Layout.defaultProps = {
  title: "Artisan Ecommerce - Shop Now", // Title of the web page
  description: "Handmade products available for online sale", // Description of the web page
  keyword: "handmade, local, ph, etc....", // Keywords for SEO
  author: "sca", // Author information
};

export default About;
