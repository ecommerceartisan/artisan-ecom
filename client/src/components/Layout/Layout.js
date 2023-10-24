import React from 'react';
import Footer from './Footer';
import Header from './Header';
import { Helmet } from "react-helmet";
import { Toaster } from 'react-hot-toast';

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      {/* This is a Layout component that serves as a wrapper for the main content of the web pages. */}
      <Helmet>
        {/* Helmet is used for managing the head of the document, including metadata and title. */}
        <meta charSet="utf-8" />
        <div>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
        </div>
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: '80vh' }}>
        <Toaster />
        {children}
        {/* The main content of the web page is passed as 'children'. */}
      </main>
      <Footer />
    </div>
  );
};

// Export the Layout component for use in other parts of the application.
export default Layout;
