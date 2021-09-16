import React from 'react'
import { Navbar,Container } from 'react-bootstrap'
const Header = () => {
    return (
        <div>
             <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="#home">
        <img
          alt=""
          src="http://gtxag.com/wp-content/uploads/2015/05/logo.png"
          width="40"
          height="30"
          className="d-inline-block align-top"
        />{' '}
       GTX Technologies
      </Navbar.Brand>
    </Container>
  </Navbar>
        </div>
    )
}

export default Header
