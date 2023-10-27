import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { PostProvider } from '../../context/context';

import './sidebarR.css'


const OffCanvasExample = ({ name, ...props }) => {

    const { showR, setShowR, handleCloseR, handleShowR } = useContext(PostProvider);

  return (
    <div className='bg-custom'>
      <Offcanvas show={showR} onHide={handleCloseR} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='bg-custom text-light'>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

function Example() {
  return (
    <>
      {['end'].map((placement, idx) => (
        <OffCanvasExample key={idx} placement={placement} name={placement} />
      ))}
    </>
  );
}

export default Example;