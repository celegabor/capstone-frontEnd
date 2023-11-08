import React, { useState, useContext } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { PostProvider } from '../../context/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHammer, faFile , faEdit , faTrash} from '@fortawesome/free-solid-svg-icons'; 
import './top.css'
import { useNavigate } from 'react-router-dom';


function OffCanvasTop({ name, ...props }) {
  const { showTop, handleCloseTop, users, videos } = useContext(PostProvider);

  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [filteredVideos, setFilteredVideos] = useState(videos);

  const navigate= useNavigate()

  const handleSearchChange = (event) => {
    const text = event.target.value;
    setSearchText(text);

    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(text.toLowerCase()) ||
      user.lastName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredUsers(filteredUsers);

    const filteredVideos = videos.filter((video) =>
      video.title.toLowerCase().includes(text.toLowerCase()) ||
      video.content.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredVideos(filteredVideos);
    if (text === '') {
      setFilteredVideos('');
      setFilteredUsers('')
    }
  };




  return (
    <div>
      <Offcanvas className='topBar-custom border border-3 rounded-bottom-5 p-3' show={showTop} onHide={handleCloseTop} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='w-100 text-center fs-3 border-bottom border-3 rounded-3 border-info'>Risultati della ricerca</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='d-flex p-2 justify-content-center ms-0 w-100'>
            <input
              className='w-75 p-3 rounded-3'
              type="text"
              placeholder="Cerca..."
              value={searchText}
              onChange={handleSearchChange}
            />
          </div>
          <div>
            {filteredUsers ? (
              <>
                {filteredUsers ? (null) : (
                  <h4 className='w-100 text-center bg-dark border  my-2'>Utenti trovati:</h4>
                )}
                
                <div className="row">
                  {filteredUsers.map((user) => (
                    <div className='col-sm-12 col-md-6 col-lg-4 text-center' key={user._id}>
                      <div onClick={() => {
                           navigate(`/getUserId/${user._id}`);
                         }} className='m-2'>
                        <div className='bg-light text-dark border border-info border-2 p-2 rounded-2'>
                          {user.name} {user.lastName}
                          <img className='ms-4 rounded-5 border-dark border border-3' height='50px' width='50px' src={user.avatar} alt='img utente' />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (null)}
            {filteredVideos === '' ? (
              null
            ) : (
              <>
                {filteredVideos ? (null) : (
                  <h4 className='w-100 text-center bg-dark border  my-2'>Video trovati:</h4>
                )}
                <div className="row">
                  {filteredVideos.map((video) => (
                    <div className='col-sm-12 col-md-6 col-lg-4 text-center' key={video._id}>
                      <div onClick={() => {
                           navigate(`/getUserId/${video.author._id}`);
                         }} className='m-2'>
                        <div className='bg-light text-dark border border-info border-2 p-2 rounded-4'>
                          <div className='d-flex'>
                            <img className='rounded-5 me-1' width='30px' height='30px' alt='img utente' src={video.author.avatar}></img>
                            <p>{video.author.name}{video.author.lastName}</p>
                          </div>
                          <video controls width='100%' height="315" src={video.video}></video>
                        <div>
                        <p>{video.title}</p>
                        <p className='m-0'>
                          <FontAwesomeIcon className='mx-2' icon={faHammer} />
                          <span className='wrap-text'>{video.categoryWork}</span>
                        </p>
                        <p className='m-0 mb-3'>
                          <FontAwesomeIcon className='mx-2' icon={faFile} />
                          <span className='wrap-text'>{video.content}</span>
                        </p>
                          
                        </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

const SidebarTop = () => {
  return (
    <OffCanvasTop placement="top" />
  );
}

export default SidebarTop;

