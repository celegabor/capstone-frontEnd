import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import CardVideos from '../CardVideos/CardVideos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCogs , faEdit , faHeart , faComment} from '@fortawesome/free-solid-svg-icons'; 
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {jwtDecode} from "jwt-decode";
import './getVideos.css';
import useSession from '../../hooks/useSession';

const GetVideos = () => {

  const token = JSON.parse(localStorage.getItem('loggedInUser'))
  const session = useSession()

  const [file, setFile] = useState(null)
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newVideo, setNewVideo] = useState({
    title: '', 
    categoryWork: '', 
    video: '', 
    content: '', 
    author: session.id });
  const [editingVideo, setEditingVideo] = useState(null); 
  const [favoriteVideos, setFavoriteVideos] = useState([]);

const [message, setMessage] = useState('')

  const onChangeSetFile = (e)=>{
    setFile(e.target.files[0])
  }

  const uploadFile = async (v) => {
    const formData = new FormData();
    formData.append('video', v);

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/video/post/upload`, {
        method: 'POST',
        body: formData,
      });

      return await response.json()

    } catch (e) {
      // Gestisci l'errore
      console.error('Errore durante l\'upload del video:', e);

    }
  };
  
  const toggleFavorite = (videoId) => {
    
    const index = favoriteVideos.indexOf(videoId);
    if (index === -1) {
     
      setFavoriteVideos([...favoriteVideos, videoId]);
    } else {
     
      const newFavorites = [...favoriteVideos];
      newFavorites.splice(index, 1);
      setFavoriteVideos(newFavorites);
    }
  }

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
        setVideos(data.videos);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    } catch (error) {
      console.error('Errore nel recupero dei video:', error);
    }
  }

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

  const addVideo = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if(file){
      try {
  
        // const videoUrl = await uploadFile(newVideo.video);
  
        // if (!videoUrl) {
        //   setIsLoading(false);
        //   return;
        // }
    
        // newVideo.video = videoUrl; 

        const uploadVideo = await uploadFile(file)

        const finalBody = {
          ...newVideo,
          video: uploadVideo.video
        }
    
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/video/post`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(finalBody),
        });
  
        if (response.ok) {
  
          setMessage('Complimenti!!! Il tuo video è stato CARICATO correttamente !!!!!');
            setTimeout(() => {
              setMessage('')
            }, 2500);
  
          getVideos();
          setShowModal(false);
          setNewVideo({ title: '', categoryWork: '', video: '', content: '', author: '' });
  
          setTimeout(() => {
              setIsLoading(false);
            }, 300);    
            console.log('aggiunto');
  
        } else {
          console.error('Errore durante l\'aggiunta del video');
        }
      } catch (error) {
  
        setMessage('Mi dispiace.... Il caricamento NON è andato a buon fine !!!!!', error);
          setTimeout(() => {
            setMessage('');
          }, 4000);
  
        console.error('Errore durante l\'aggiunta del video:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  const editVideo = (videoId) => {
    const videoToEdit = videos.find((video) => video._id === videoId);
    setEditingVideo(videoToEdit);
  
    setNewVideo({
      title: videoToEdit.title,
      categoryWork: videoToEdit.categoryWork,
      video: videoToEdit.video,
      content: videoToEdit.content,
      author: session.id,
    });
  
    setShowModal(true);
  }

  const saveEditedVideo = async () => {
   
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/video/put/${editingVideo._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVideo),
      });

      if (response.ok) {

        setMessage('Complimenti!!! Il tuo video è stato MODIFICATO correttamente !!!!!');
          setTimeout(() => {
            setMessage('')
          }, 2500);

        getVideos();
        setShowModal(false);
        setEditingVideo(null);
        setNewVideo({ title: '', categoryWork: '', video: '', content: '', author: '' })
        setTimeout(() => {
          setIsLoading(false);
        }, 300); 
        console.log('aggiornato');

      } else {
        setNewVideo({ title: '', categoryWork: '', video: '', content: '', author: '' })
        console.error('Errore durante la modifica del video');
      }

    } catch (error) {

      setMessage('Mi dispiace.... Il caricamento NON è andato a buon fine !!!!!', error);
        setTimeout(() => {
          setMessage('');
        }, 4000);

      setNewVideo({ title: '', categoryWork: '', video: '', content: '', author: '' })
      console.error('Errore durante la modifica del video:', error);

    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    getVideos();
  }, []);

  const renderAddVideoForm = () => {
    return (
      <Form>
        <Form.Group controlId="formTitle">
          <Form.Label>Titolo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il titolo del video"
            value={newVideo.title}
            onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formCategoryWork">
          <Form.Label>Categoria di Lavoro</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci la categoria di lavoro"
            value={newVideo.categoryWork}
            onChange={(e) => setNewVideo({ ...newVideo, categoryWork: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formVideo">
          <Form.Label>Link al Video</Form.Label>
          <Form.Control
            required
            type="file"
            name='video'
            onChange={onChangeSetFile}
          />
        </Form.Group>
        {/* <Form.Group controlId="formVideo">
          <Form.Label>Link al Video</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il link al video"
            value={newVideo.video}
            onChange={(e) => setNewVideo({ ...newVideo, video: e.target.value })}
          />
        </Form.Group> */}
        <Form.Group controlId="formContent">
          <Form.Label>Contenuto</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Inserisci il contenuto del video"
            value={newVideo.content}
            onChange={(e) => setNewVideo({ ...newVideo, content: e.target.value })}
          />
        </Form.Group>
      </Form>
    );
  }

  return (
    <>
      {isLoading ? (
        
        <div key={new Date().getTime()+ 'loading'} className="d-flex align-items-center justify-content-center text-grey spinner-custom">
          <Spinner className="text-white" animation="border" role="status" key="spinner">
          </Spinner>
          <p className="fs-5 text-white m-3" key="loading-text">Caricamento...</p>
        </div>

      ) : (
        
        <div className="main text-gray d-flex flex-wrap justify-content-center background-color: rgb(72, 69, 69);">

          {/* bottone aggiungi video */}
          <div className="w-100 custom-button-addVideo d-flex justify-content-end p-3">
              <Button variant="light border-2 border-dark button-custom" onClick={() => setShowModal(true)}>
                <FontAwesomeIcon icon={faEdit} /> Aggiungi Video
              </Button>
          </div>

          {videos.map((video) => (
            <>
              {/* singola card filtrata */}
              <div className="card-video bg-secondary m-3 p-3" key={video._id}>
                <CardVideos video={video} />
                <div className="d-flex justify-content-end w-100">
                  <div>
                    <Button
                    className="mx-2 px-3 py-1 ml-2"
                    variant={favoriteVideos.includes(video._id) ? "danger" : "dark"}
                    onClick={() => toggleFavorite(video._id)} 
                    >
                      <FontAwesomeIcon icon={faHeart} />
                    </Button>
                    {video.author._id === session.id ? (
                      <>
                        <Button className="px-3 py-1" variant="dark" onClick={() => deleteVideo(video._id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                        <Button className=" mx-2 px-3 py-1 ml-2" variant="dark" onClick={() => editVideo(video._id)}>
                          <FontAwesomeIcon icon={faCogs} />
                        </Button>
                      </>
                    ) : (null)}
                  </div>
                </div>
              </div>

              {/* contenitore messaggi generali crud */}
              <div className="message-container">
                {message && <div className={message.includes('NON') ? 'NOT-success-message' : 'success-message'}>{message}</div>}
              </div>
            </>

          ))}
          
        </div>
      )}

    {/* modale x aggiunta post */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header className='custom-bg' closeButton>
          <Modal.Title >Aggiungi un nuovo video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderAddVideoForm()}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
                Chiudi
            </Button>
            {editingVideo ? (
                <Button variant="primary" onClick={saveEditedVideo}>
                Aggiorna Video
                </Button>
            ) : (
                <Button variant="primary" onClick={addVideo}>
                Salva Video
                </Button>
            )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GetVideos;