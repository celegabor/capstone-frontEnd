import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyNavbar from '../components/navbar/MyNavbar';
import { Navigate, useNavigate } from 'react-router-dom'; 
import { jwtDecode } from 'jwt-decode';
import Spinner from 'react-bootstrap/Spinner';
import { faHammer, faFile, faHome } from '@fortawesome/free-solid-svg-icons'; 
import './user.css'



function User() {
  const [users, setUsers] = useState([]);
  const [userFormData, setUserFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    dob: '',
    address: '',
    avatar: '',
    doc:'',
  });
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [fileDoc, setFileDoc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('loggedInUser');
  const token2 = JSON.parse(localStorage.getItem('loggedInUser'))
  const decodedToken = jwtDecode(token);

  const getVideos = async () => {
    setIsLoading(true);

    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/video/get`,{
        headers:{
          'Authorization': token2,
        }
      });


      if (response.ok) {
        const data = await response.json();
        const filteredVideos = data.videos.filter((video) => video.author._id === decodedToken.id);
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

  const getUsers = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users2/get`);
      if (response.ok) {
        const data = await response.json();
        const filteredUsers = data.users.filter((user) => user._id === decodedToken.id);
        setUsers([...filteredUsers]);


      } else {
        console.error('Errore nella richiesta GET:', response.status);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }

    } catch (error) {
      console.error('Errore nel recupero dei dati:', error);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  };

  useEffect(() => {
    getUsers();
    getVideos()
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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({
      ...userFormData,
      [name]: value,
    });
  };

  const onChangeSetFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFileDoc = async (img) => {
    setIsLoading(true)
    const formData = new FormData();
    formData.append('doc', img);
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users2/post/docUpload`, {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Errore durante il caricamento dell\'avatar.');
        
      }

    } catch (e) {
      console.error('Errore durante il caricamento dell\'avatar:', e);
      throw e;
    }
  }

  const uploadFile = async (img) => {
    setIsLoading(true)
    const formData = new FormData();
    formData.append('avatar', img);
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users2/post/upload`, {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Errore durante il caricamento dell\'avatar.');
        
      }

    } catch (e) {
      console.error('Errore durante il caricamento dell\'avatar:', e);
      throw e;
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
  
    const dobAsNumber = parseInt(userFormData.dob);
    const updatedData = {
      ...userFormData,
      dob: dobAsNumber,
    };
  
    if (file || fileDoc) {
      try {
        if (file) {
          const uploadAvatar = await uploadFile(file);
          updatedData.avatar = uploadAvatar.avatar;
        }
        
        if (fileDoc) {
          const uploadDoc = await uploadFileDoc(fileDoc);
          updatedData.doc = uploadDoc.docUrl;
        }
  
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users2/put/${decodedToken.id}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });
  
        if (response.ok) {
          setUserFormData({
            name: '',
            lastName: '',
            avatar: '',
            address: '',
            dob: '',
            email: '',
            password: '',
            doc: '',
          });
          setMessage('Complimenti!!! Utente MODIFICATO correttamente !!!!');
          setTimeout(() => {
            setMessage('');
            setIsSuccessful(true);
            navigate('/home');
          }, 1500);
        } else {
          setMessage('Mi dispiace.... L\'aggiornamento NON è andato a buon fine !!!!!');
          setTimeout(() => {
            setMessage('');
            setIsSuccessful(true);
          }, 3000);
        }
  
        setIsLoading(false);
      } catch (error) {
        console.error('Errore durante l\'aggiornamento:', error);
        setMessage('Mi dispiace.... L\'aggiornamento NON è andato a buon fine !!!!!');
        setTimeout(() => {
          setMessage('');
        }, 4000);
      }
    } else {
      setMessage('Nessuna modifica effettuata.');
      setIsLoading(false);
    }
  };
  
  
  const deleteVideo = async (videoId) => {
    const confirmDelete = window.confirm('Sei sicuro di voler cancellare questo video?');
    if (!confirmDelete) {
      return;
    }

    try {
      setIsLoading(true);
      await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/video/delete/${videoId}`, {
        method: 'DELETE',
      });
      
      setMessage('Complimenti!!! Il cancellamento è andato a buon fine !!!!!');
          setTimeout(() => {
            setMessage('')
          }, 2500);
    
          getVideos();
        
      console.log('cancellato');
    } catch (error) {

      setMessage('Mi dispiace.... Il caricamento NON è andato a buon fine !!!!!', error);
        setTimeout(() => {
          setMessage('');
        }, 4000);

      console.error('Errore nella cancellazione del video:', error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  };

  const handleDocUpload = (e) => {
    const docFile = e.target.files[0];
    setFileDoc(docFile);
  };
  

  return (
    <>
      {isLoading ? (
        <>
          <div className="spinner-container bg-dark d-flex flex-column justify-content-center align-items-center text-white">
            <Spinner className='fs-5' animation="border" role="status">
              <span className="sr-only"></span>
            </Spinner>
            <p>Caricamento...</p>
            <p className='mt-2'>..attendi qualche secondo!</p>
          </div>
        </>
    
        ) : isSuccessful ? ( 

          <Navigate to="/home" />

        ) : (  
          <>
            <div className='bg-dark text-light container-user-put'>
              <MyNavbar />
              <h2 className='p-3'>Informazioni sull'utente:</h2>
              <Button className='px-3' variant='secondary' onClick={() => navigate('/home')}>
                <FontAwesomeIcon icon={faHome}/>
              </Button>
              <form className='w-100 text-center form-user-put'>
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      <div className='w-100 p-2 m-2 d-flex flex-column'>
                        {/* Immagine profilo */}
                        <label>Immagine profilo:</label>
                        <div className='w-100 d-flex flex-column align-items-center'>
                          {file ? (
                            <img className='border border-4 ' width={'70%'} height={'80%'} src={URL.createObjectURL(file)} alt="documento" />
                          ) : (
                            <img className='border border-4' width={'70%'} height={'80%'} src={users.map((user)=>user.avatar)}alt="immagine profilo" />
                          )}
                          <input className='w-100 mt-3 bg-secondary text-white p-2 rounded-3 border-bottom border-2' type="file" name='avatar' onChange={onChangeSetFile} />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 uploadDoc">
                      {/* caricamento immagini "doc" */}
                      <div className='w-100 p-2 m-2 d-flex flex-column align-items-center'>
                        <label>Carica immagini "doc":</label>
                        {fileDoc ? (
                          <img className='border border-4 ' width={'70%'} height={'80%'} src={URL.createObjectURL(fileDoc)} alt="documento" />
                        ) : (
                          <img className='border border-4 ' width={'70%'} height={'80%'} src={users.map((user)=>user.doc)} alt="documento" />
                        )}
                        <input
                          className='w-100 mt-3 bg-secondary text-white p-2 rounded-3 border-bottom border-2'
                          type="file"
                          name="doc"
                          onChange={handleDocUpload}
                        />
                      </div>
                    </div>                  
                  </div>
                  <div className="row">
                    {/* Nome */}
                    <div className="col-md-6">
                      <div className='w-100 p-2 d-flex flex-column text-center'>
                        <label className='text-start'>Nome:</label>
                        <input
                          className='bg-secondary text-white p-2 rounded-3 border-bottom border-2'
                          type="text"
                          name="name"
                          value={userFormData.name}
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>
                    {/* Cognome */}
                    <div className="col-md-6">
                      <div className='d-flex'>
                        <div className='w-100 p-2 d-flex flex-column'>
                          <label>Cognome:</label>
                          <input
                            className='bg-secondary text-white p-2 rounded-3 border-bottom border-2'
                            type="text"
                            name="lastName"
                            value={userFormData.lastName}
                            onChange={handleFormChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {/* Email */}
                    <div className="col-md-6">
                      <div className='w-100 p-2 d-flex flex-column'>
                        <label>Email:</label>
                        <input
                          className='bg-secondary text-white p-2 rounded-3 border-bottom border-2'
                          type="email"
                          name="email"
                          value={userFormData.email}
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      {/* Indirizzo */}
                      <div className='w-100 p-2 d-flex flex-column'>
                        <label>Indirizzo:</label>
                        <input
                          className='bg-secondary text-white p-2 rounded-3 border-bottom border-2'
                          type="text"
                          name="address"
                          value={userFormData.address}
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      {/* Data di Nascita */}
                      <div className='p-2 d-flex flex-column'>
                        <label>Data di nascita:</label>
                        <input
                          className='bg-secondary text-white p-2 rounded-3 border-bottom border-2'
                          type="date"
                          name="dob"
                          value={userFormData.dob}
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <Button className='border border-2 border-secondary my-3 w-100' variant='dark' type="submit" onClick={handleSubmit}>
                        Modifica Dati
                      </Button>
                    </div>
                  </div>
                </div>
              </form>

              <div className="message-container">
                {message && <div className={message.includes('NON') ? 'NOT-success-message-put-user' : 'success-message-put-user'}>{message}</div>}
              </div>
              
              <h4 className='m-5 px-5'>I tuoi video :</h4>

                {videos.map((video) => (
                  <>
                    <div className='col-3 col-md-0'></div>
                    <div key={video._id} className='col-12 col-md-6 mb-4'>
                      <div className='w-100'>
                        <div className="dettails-post mb-3">
                          <video controls width="100%" height="315" src={video.video}></video>
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
                            <div className="w-100 text-center p-3">
                              <Button className="w-50" variant="danger" onClick={() => deleteVideo(video._id)}>
                                Cancella video
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-3 col-md-0'></div>
                  </>
                ))}


            </div>
          </>
          
      )
    }
    </>
  );
};

export default User;