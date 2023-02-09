import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {NavLink} from 'react-router-dom'

const AppNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
    <Navbar.Brand >CRUD</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link ><NavLink to="/" >LIST</NavLink></Nav.Link>
        <Nav.Link ><NavLink to="/create" >CREATE</NavLink></Nav.Link>
        </Nav>
    </Navbar.Collapse>
  </Navbar>
  )
}

export default AppNavbar
