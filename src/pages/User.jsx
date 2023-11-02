import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyNavbar from '../components/navbar/MyNavbar';
import { jwtDecode } from 'jwt-decode';

function User() {
  const [users, setUsers] = useState([]);
  const [userFormData, setUserFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    dob: '',
    address: '',
    avatar: '',
  });
  console.log(userFormData);

  const token = localStorage.getItem('loggedInUser');
  const decodedToken = jwtDecode(token);

  const getUsers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users2/get`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else {
        console.error('Errore nella richiesta GET:', response.status);
      }
    } catch (error) {
      console.error('Errore nel recupero dei dati:', error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const currentUser = users.find((user) => user._id === decodedToken.id);

      if (currentUser) {
        setUserFormData({
          name: currentUser.name,
          lastName: currentUser.lastName,
          email: currentUser.email,
          dob: currentUser.dob,
          address: currentUser.address,
          avatar: currentUser.avatar
        });
      }
    }
  }, [users, decodedToken.id]);

  // Gestisce la modifica dei campi del form
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({
      ...userFormData,
      [name]: value,
    });
  };

  return (
    <div className='bg-dark text-light p-5'>
      <MyNavbar />
      <h2>Informazioni sull'utente:</h2>
      <form className='w-100 text-center'>
        <div className='w-100 p-2 m-2 d-flex flex-column'>
          <label>Immagine profilo:</label>
          <div className='w-100 text-center'>
            <img width={'200px'} src={userFormData.avatar} alt="" />
          </div>
        </div>
        <div className='w-100 p-2 m-2 d-flex flex-column'>
          <label className='w-100 text-start'>Nome:</label>
          <input
            className='w-50 bg-secondary text-white p-2 rounded-3 border-bottom border-2'
            type="text"
            name="name"
            value={userFormData.name}
            onChange={handleFormChange}
          />
        </div>
        <div className='w-100 p-2 m-2 d-flex flex-column'>
          <label>Cognome:</label>
          <input
            className='w-50 bg-secondary text-white p-2 rounded-3 border-bottom border-2'
            type="text"
            name="lastName"
            value={userFormData.lastName}
            onChange={handleFormChange}
          />
        </div>
        <div className='w-100 p-2 m-2 d-flex flex-column'>
          <label>Email:</label>
          <input
            className='w-50 bg-secondary text-white p-2 rounded-3 border-bottom border-2'
            type="email"
            name="email"
            value={userFormData.email}
            onChange={handleFormChange}
          />
        </div>
        <div className='w-100 p-2 m-2 d-flex flex-column'>
          <label>Data di nascita:</label>
          <input
            className='w-50 bg-secondary text-white p-2 rounded-3 border-bottom border-2'
            type="text"
            name="dob"
            value={userFormData.dob}
            onChange={handleFormChange}
          />
        </div>
        <div className='w-100 p-2 m-2 d-flex flex-column'>
          <label>Indirizzo:</label>
          <input
            className='w-50 bg-secondary text-white p-2 rounded-3 border-bottom border-2'
            type="text"
            name="address"
            value={userFormData.address}
            onChange={handleFormChange}
          />
        </div>
      </form>
    </div>
  );
}

export default User;
