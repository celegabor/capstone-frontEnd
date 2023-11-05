import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MyNavbar from '../components/navbar/MyNavbar';
import Spinner from 'react-bootstrap/Spinner';
import { jwtDecode } from 'jwt-decode';
import { faHammer, faFile } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';




function GetUserId() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState([]);

  const token = JSON.parse(localStorage.getItem('loggedInUser'))
  const decodedToken = jwtDecode(token);

  const getVideos = async () => {
    setIsLoading(true);

    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/video/get`,{
        headers:{
          'Authorization': token,
        }
      });


      if (response.ok) {
        const data = await response.json();
        const filteredVideos = data.videos.filter((video) => video.author._id === userId);
        setVideos([...filteredVideos]);
  
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }

    } catch (error) {
      console.error('Errore nel recupero dei video:', error);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }

  const getUsers = async ()=>{

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users2/get/${userId}`)

      const data = await response.json()
      if (response.ok) {
        setUser(data.user);
      } else {
        console.error('Errore nel recupero dei dati:', data.message);
      }
      
    } catch (e) {
      console.error('Errore nel recupero dei video:', e);
    }
  }


  useEffect(() => {
    getUsers()
    getVideos()
  }, [userId]);

  return (
    <>
      {isLoading ? (
        <>
          <div className="spinner-container bg-dark d-flex flex-column justify-content-center align-items-center text-white">
            <Spinner className='fs-5' animation="border" role="status">
              <span className="sr-only"></span>
            </Spinner>
            <p>Caricamento...</p>
          </div>
        </>
    
        ) : (
        <div className="bg-dark text-light p-5">
          <MyNavbar />
          <h2>Dettagli dell'utente:</h2>
          {user ? (
            <>
              <form className="w-100 text-center">
                <div className="w-100 p-2 m-2 d-flex flex-column align-items-center">
                  <label>Immagine profilo:</label>
                  <img
                    className="border border-4"
                    width={'300px'}
                    src={user.avatar}
                    alt={`Avatar di ${user.name}`}
                  />
                </div>

                {/* nome cognome */}
                <div className="d-flex">
                  <div className="w-100 p-2 m-2 d-flex flex-column text-center">
                    <label className="text-start">Nome:</label>
                    <input
                      className="bg-secondary text-white p-2 rounded-3 border-bottom border-2"
                      type="text"
                      name="name"
                      value={user.name}
                      readOnly
                    />
                  </div>
                  <div className="w-100 p-2 m-2 d-flex flex-column">
                    <label>Cognome:</label>
                    <input
                      className="bg-secondary text-white p-2 rounded-3 border-bottom border-2"
                      type="text"
                      name="lastName"
                      value={user.lastName}
                      readOnly
                    />
                  </div>
                </div>

                {/* email indirizzo */}
                <div className="d-flex">
                  <div className="w-100 p-2 m-2 d-flex flex-column">
                    <label>Email:</label>
                    <input
                      className="bg-secondary text-white p-2 rounded-3 border-bottom border-2"
                      type="email"
                      name="email"
                      value={user.email}
                      readOnly
                    />
                  </div>
                  <div className="w-100 p-2 m-2 d-flex flex-column">
                    <label>Indirizzo:</label>
                    <input
                      className="bg-secondary text-white p-2 rounded-3 border-bottom border-2"
                      type="text"
                      name="address"
                      value={user.address}
                      readOnly
                    />
                  </div>
                </div>

                {/* dob */}
                <div className="p-2 m-2 d-flex flex-column">
                  <label>Data di nascita:</label>
                  <input
                    className="w-50 bg-secondary text-white p-2 rounded-3 border-bottom border-2"
                    type="date"
                    name="dob"
                    value={user.dob}
                    readOnly
                  />
                </div>
              </form>
              <h4 className='px-5 m-5'>i video di
              <i className='ms-2'><b>{user.name} {user.lastName}</b></i>  :</h4>
              { videos.map((video) => (
                  <div className='w-100 d-flex flex-row flex-wrap-wrap'>
                    <div className='w-50'>
                      <div className="dettails-post">
                        <iframe
                            width="400"
                            height="315"
                            src={video.video}
                            frameBorder="0"
                            allowFullScreen
                            title="Video di YouTube"
                        />
                        <div>
                          <h4>{video.title}</h4>
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
            </>
          ) : (
            <p>Caricamento in corso...</p>
          )}
        </div>
        )}
    </>
  );
}

export default GetUserId;
