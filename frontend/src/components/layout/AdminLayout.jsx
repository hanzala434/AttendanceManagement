import React from 'react'
import AdminHeader from './AdminHeader'
import Footer from './Footer'
import { Helmet } from "react-helmet";
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({
  children,
  title = 'AMS',
  description = 'AMS',
  keyword = 'mern,react,node,mongodb',
  author = 'Unknown'
}) => {
  return (
    <>
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <AdminHeader />
      <main style={{ minHeight: '80vh' }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
    </>
  );
};

export default Layout;