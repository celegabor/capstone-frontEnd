import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { PostProvider } from '../../context/context';
import './sidebar.css'

const MySidebar = ()=> {

    const { show, setShow, handleClose, handleShow } = useContext(PostProvider);

  return (
    <div>
      <Offcanvas className="sidebar-left-custom" show={show} onHide={handleClose}>
        <Offcanvas.Header className='bg-light text-dark' closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='bg-custom text-secondary d-flex flex-column justify-content-around align-items-center'>
          <Button variant='secondary' className='w-50'>uno</Button>
          <Button variant='secondary' className='w-50'>due</Button>
          <Button variant='secondary' className='w-50'>tre</Button>
          <Button variant='secondary' className='w-50'>quattro</Button>
          <Button variant='secondary' className='w-50'>cinque</Button>
          <Button variant='secondary' className='w-50'>sei</Button>
          
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default MySidebar;