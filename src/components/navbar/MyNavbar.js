import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './navbar.css'
import Logo from '../../img/JobWork.png'
import { Modal, Button } from 'react-bootstrap';


const MyNavbar = ()=> {

  const [showLogoutModal, setShowLogoutModal] = useState(false);


  const navigate = useNavigate()
  const handleShowLogoutModal = () => {
    setShowLogoutModal(true);
  };

  
  return (
    <>
      <Navbar expand="lg" className="custom-background-navbar">
        <Container className='d-flex justify-content-between px-5'>
          <img onClick={()=>{ navigate('/')}} className='logo' src={Logo} alt='logo site'></img>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className='border-custom-navbar mx-3 px-3 text-light' href="/about">About</Nav.Link>
              <Nav.Link className='border-custom-navbar mx-3 px-3 text-light' href="/contacts">Contacts</Nav.Link>
              <NavDropdown className='border-custom-navbar mx-3 px-3' title="Altro" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <button className='px-5 p-2 rounded-2 border border-light bg-dark text-light' onClick={handleShowLogoutModal}>LogOut</button>
        </Container>
    </Navbar>

      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title className='w-100 text-center'>...conferma Logout...</Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-dark text-light p-4'>
        Sei sicuro di voler effettuare il logout?
      </Modal.Body>
      <Modal.Footer className='bg-dark text-light p-4'>
        <Button variant="secondary border border-2" onClick={() => setShowLogoutModal(false)}>
          Annulla
        </Button>
        <Button
          variant="dark border border-2"
          onClick={() => {
            // Cancella l'elemento 'loggedInUser' dal Local Storage
            localStorage.removeItem('loggedInUser');
            setShowLogoutModal(false);
            navigate('/');
          }}
        >
          Conferma
        </Button>
      </Modal.Footer>
      </Modal>
    </>
  );
}

export default MyNavbar;