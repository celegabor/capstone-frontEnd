import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MyNavbar from '../components/navbar/MyNavbar';
import Spinner from 'react-bootstrap/Spinner';


function GetUserId() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true)
    fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users2/get/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          setUser(data.user);
        } else {
          console.error('Errore nel recupero dei dati:', data.message);
        }

        setTimeout(() => {
          setIsLoading(false)
        }, 500);
      })
      .catch((error) => {
        console.error('Errore nel recupero dei dati:', error);
      });
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
          ) : (
            <p>Caricamento in corso...</p>
          )}
        </div>
        )}
    </>
  );
}

export default GetUserId;
