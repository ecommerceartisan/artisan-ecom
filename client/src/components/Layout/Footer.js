import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
      {/* This is a simple footer component for a website. */}
      <h6 className="text-center">All Rights Reserved &copy; Artisan Ecommerce</h6>
      <p className="text-center mt-3">
        {/* These are links to different pages of the website. */}
        <Link to="/about">About</Link>
        <Link to="/contact">Contacts</Link>
        <Link to="/policy">Privacy Policy</Link>
        <Link to="/faq">FAQ</Link>
      </p>
    </div>
  );
};

// Export the Footer component for use in other parts of the application.
export default Footer;
