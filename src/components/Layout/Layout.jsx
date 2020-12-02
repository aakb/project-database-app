import React from 'react';
import Nav from '../Common/MainNav'
import Footer from '../Footer/Footer'

function Layout ({children, location}) {

  return (
    <>
      <Nav active={location.path} />
      {children}
      <Footer />
    </>
  )
}

export default Layout