import React, { useContext } from 'react';
import './main.css';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PostProvider } from '../../context/context';
import { faCog, faUser } from '@fortawesome/free-solid-svg-icons';
import GetVideos from '../getVideos/GetVideos';


const Main = () => {
  const { show, setShow, handleClose, handleShow,showR, setShowR, handleCloseR, handleShowR } = useContext(PostProvider);


  return (
    <>
      <div className='d-flex bg-container p-2 justify-content-between ms-0 w-100'>
        <Button className="z-2 bt-r-custom mx-4 m-1 border border-dark border-2 bg-light text-dark" variant="primary" onClick={handleShowR}>
          <FontAwesomeIcon icon={faUser} />
        </Button>
        <Button className="z-2 bt-l-custom mx-4 m-1 border border-dark border-2 bg-light text-dark" variant="secondary" onClick={handleShow}>
          <FontAwesomeIcon icon={faCog} /> 
        </Button>
      </div>

      <GetVideos/>

    </>
  );
}

export default Main;
