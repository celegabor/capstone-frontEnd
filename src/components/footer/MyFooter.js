import Nav from 'react-bootstrap/Nav';
import React from 'react';
import './footer.css'

const MyFooter = ()=> {
  return (
    <div className="custom-background p-3">
      <Nav className=" justify-content-center" activeKey="/home">
        <Nav.Item>
          <Nav.Link href="/home">Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link2" >
            Link
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="text-center mt-4 mb-4">
        <p>Privacy-Policy</p>
        <p className='text-dark'>info@JobWork.it</p>
      </div>
      
    </div>
  );
}

export default MyFooter;