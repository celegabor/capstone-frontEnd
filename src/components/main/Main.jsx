import React, { useContext } from 'react';
import './main.css';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PostProvider } from '../../context/context';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import GetVideos from '../getVideos/GetVideos';


const Main = () => {
  const { show, setShow, handleClose, handleShow } = useContext(PostProvider);

  return (
    <>
      <Button className="button-sidebar border border-dark border-2 bg-light text-dark" variant="secondary" onClick={handleShow}>
        <FontAwesomeIcon icon={faCog} /> 
      </Button>

      <GetVideos/>

    </>
  );
}

export default Main;
