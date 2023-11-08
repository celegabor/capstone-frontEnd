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
      <Navbar expand="lg" className="custom-background-navbar z-index-custom">
        <Container className='d-flex justify-content-between container-navbar'>
          <img onClick={()=>{ navigate('/')}} className='logo-navbar' src={Logo} alt='logo site'></img>
          <Navbar.Toggle className='navbar-toggle' aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto p-3">
              <Nav.Link className='border-custom-navbar mx-2 m-1 px-5' href="/home">Home</Nav.Link>
              <Nav.Link className='border-custom-navbar mx-2 m-1 px-5' href="/contacts">Contacts</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Button variant='info' className='border-custom-navbar mx-2 m-1 px-5' onClick={handleShowLogoutModal}>LogOut</Button>
        </Container>
    </Navbar>

      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title className='w-100 text-center'>...conferma Logout...</Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-dark text-info p-4'>
        Sei sicuro di voler effettuare il logout?
      </Modal.Body>
      <Modal.Footer className='border-top border-info bg-dark text-light p-4'>
        <Button variant="outline-info" onClick={() => setShowLogoutModal(false)}>
          Annulla
        </Button>
        <Button
          variant="outline-danger"
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