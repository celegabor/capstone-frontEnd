import Nav from 'react-bootstrap/Nav';
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
      <Nav className='custom-background-navbar d-flex align-items-center justify-content-between' variant="underline" defaultActiveKey="/home">
        <div className='d-flex mx-3 align-items-center justify-content-between'>
          <img className='logo' src={Logo} alt='logo site'></img>
          <Nav.Item className='mx-2'>
            <Nav.Link href="/home">Active</Nav.Link>
          </Nav.Item>
          <Nav.Item className='mx-2'>
            <Nav.Link eventKey="link-1">Option 2</Nav.Link>
          </Nav.Item>
          <Nav.Item className='mx-2'>
            <Nav.Link eventKey="link-1">Option 3</Nav.Link>
          </Nav.Item>
          <Nav.Item className='mx-2'>
            <Nav.Link eventKey="link-1">Option 4</Nav.Link>
          </Nav.Item>
        </div>
        <button className='px-5 p-2 rounded-2 border border-light bg-dark text-light' onClick={handleShowLogoutModal}>LogOut</button>

        
      </Nav>

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