import Nav from 'react-bootstrap/Nav';
import React from 'react';
import './navbar.css'
import Logo from '../../img/JobWork.png'
const MyNavbar = ()=> {
  return (
    <Nav className='custom-background-navbar' variant="underline" defaultActiveKey="/home">
      <img className='logo' src={Logo} alt='logo site'></img>
      <Nav.Item>
        <Nav.Link href="/home">Active</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Option 2</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Option 3</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Option 4</Nav.Link>
      </Nav.Item>
      
    </Nav>
  );
}

export default MyNavbar;