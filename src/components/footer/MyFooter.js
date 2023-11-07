import Nav from 'react-bootstrap/Nav';
import React from 'react';
import './footer.css'
import { useNavigate } from 'react-router-dom'
import Logo from '../../img/JobWork.png'



const MyFooter = ()=> {

  const navigate = useNavigate()

  return (
    <div className="custom-background p-3">
      <Nav className=" justify-content-center" activeKey="/home">
        <Nav.Item>
          <Nav.Link className='text-light border-bottom mx-2 rounded-5 border-2' href="/home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className='text-light border-bottom mx-2 rounded-5 border-2' href='/contacts'>Contacts</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className='text-light border-bottom mx-2 rounded-5 border-2' href='/'>Landing Page</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className='w-100 text-center'>
        <img className='logo logo-custom p-0 m-0' src={Logo} alt='logo site'></img>
      </div>
      <div className="text-center mt-4 mb-4">
        <p>Privacy-Policy</p>
        <p className='text-dark'>info@JobWork.it</p>
      </div>
      
    </div>
  );
}

export default MyFooter;