import React, { useContext } from 'react';
import './main.css';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PostProvider } from '../../context/context';
import { faCog, faUser, faSearch, faMessage, faSlash } from '@fortawesome/free-solid-svg-icons';
import GetVideos from '../getVideos/GetVideos';


const Main = () => {
  const { handleShow, handleShowR, handleShowTop } = useContext(PostProvider);

  return (
    <>
      <div className='bg-main-custom p-3 ms-0 w-100'>

        {/* show sidebar right */}
        <Button className="z-2 bt-r-custom mx-3 m-1 border border-dark border-2 bg-light text-dark" onClick={handleShowR}>
          <FontAwesomeIcon icon={faUser} />
          <FontAwesomeIcon icon={faSlash} />
          <FontAwesomeIcon icon={faMessage} />
        </Button>

        {/* show sidebar left */}
        <Button className="z-2 bt-l-custom mx-4 m-1 border border-dark border-2 bg-light text-dark" onClick={handleShow}>
          <FontAwesomeIcon icon={faCog} /> 
        </Button>

        {/* show search section */}
        <Button onClick={handleShowTop} className="z-2 bt-search-custom m-1 border border-dark border-2 bg-light text-dark">
          <FontAwesomeIcon className='me-2 ps-1' icon={faSearch} />
          Ricerca
        </Button>
      </div>
      
      <GetVideos/>
    </>
  );
}
export default Main;
