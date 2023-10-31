import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHammer, faFile , faEdit , faTrash} from '@fortawesome/free-solid-svg-icons'; 
import './cardVideo.css';
import useSession from '../../hooks/useSession';


const CardVideos = ({ video }) => {

  const session = useSession()  

  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [editCommentId, setEditCommentId] = useState(null);
  const [editComment, setEditComment] = useState(false)

  const getComments = () => {
    if (showComments) {
      fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/comment/get`,{
      })
        .then((response) => response.json())
        .then((data) => {
          const filteredComments = data.comments.filter((comment) => comment.videoId === video._id);
          setComments(filteredComments);
          console.log(data);
        })
        .catch((error) => {
          console.error('Errore nel recupero dei commenti:', error);
        });
    }
  };

  useEffect(() => {
    getComments();

  }, [showComments, video._id]);

  const addComment = () => {

    if (newComment.trim() === '') {
      return;
    }

    fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/video/${video._id}/comment/post`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment: newComment,
        videoId: video._id,
        author: session.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        getComments();
        setNewComment('');
      })
      .catch((error) => {
        console.error('Errore nell\'aggiunta del commento:', error);
      });
  };

  const deleteComment = (commentId) => {
    fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/comment/delete/${commentId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        getComments();
      })
      .catch((error) => {
        console.error('Errore durante l\'eliminazione del commento:', error);
      });
  };

  const startEditComment = (commentId) => {
    const commentToEdit = comments.find((comment) => comment._id === commentId);
    setEditCommentId(commentId);
    setNewComment(commentToEdit.comment);

    setEditComment(true)
  };

  const saveEditedComment = (commentId) => {
    if (newComment.trim() === '') {
      return;
    }

    fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/comment/put/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment: newComment,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        getComments();
        cancelEdit();
        setEditComment(false)
      })
      .catch((error) => {
        console.error('Errore durante la modifica del commento:', error);
      });
  };

  const cancelEdit = () => {
    setEditCommentId(null);
    setNewComment('');
    setEditComment(false)
  };



  return (
    <div className="text-light">

      {/* autore */}
      <div className="d-flex p-1">
        {video.author ? (
          <>
            <img className="img-avatar-author object-fit-contain" src={video.author.avatar} alt="img autore" />
            <p className="name-author">
              {video.author.name} {video.author.lastName}
            </p>
          </>

        ) : (
          <>
            <img className="img-avatar-author" src="https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg" alt="img autore" />
            <p className="name-author">
              Utente Sconosciuto
            </p>
          </>
        )}
      </div>

      {/* card videos */}
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

      <div>
        <Button
          variant="dark"
          className='m-2 custom-show-comments'
          onClick={() => setShowComments(!showComments)}
        >
          {showComments ? 'Nascondi commenti' : 'Mostra commenti'}
        </Button>

      {/* sezione commenti */}
      {showComments && (
        <>
          <div className="w-100">
            <div>
              {comments.map((comment) => (
                <div className="rounded-3 p-1 bg-dark mb-2" key={comment._id}>
                  <div>
                    <div className="w-100 d-flex flex-row justify-content-between position-relative">

                      {/* controlla se comment.author esiste altimenti imposta valori predefiniti */}
                      <div className="d-flex align-items-center position-relative">
                        {comment.author ? (
                          <div className='d-flex align-items-center'>
                            <img className="img-avatar-author object-fit-contain" src={comment.author.avatar} alt="img autore" />
                            <p className="name-author">
                              {comment.author.name} {comment.author.lastName}
                            </p>

                          </div>

                        ) : (
                          <>
                            <img className="img-avatar-author" src="https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg" alt="img autore" />
                            <p className="name-author">
                              Utente Sconosciuto
                            </p>
                          </>
                        )}
                      </div>

                      <div className="d-flex align-items-center position-relative">

                        {editCommentId === comment._id ? (
                          null
                        ):(
                          <div className="d-flex">
                            {comment.author && comment.author._id === session.id && (
                              <>
                                <Button className="m-1 border border-light" variant="secondary" onClick={() => startEditComment(comment._id)}>
                                  <FontAwesomeIcon icon={faEdit} />
                                </Button>
                                <Button className="m-1 border border-light" variant="secondary" onClick={() => deleteComment(comment._id)}>
                                  <FontAwesomeIcon icon={faTrash} />
                                </Button>
                              </>
                            )}
                          </div>

                        )}
                      </div>

                    </div>

                    {/* modifica commento */}
                    {editCommentId === comment._id ? (
                      <div className=''>
                        <input
                          className="w-100 p-2 mt-1 rounded-3"
                          type="text"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                        />
                       
                        <Button className="m-2 w-50" variant="success" onClick={() => saveEditedComment(comment._id)}>
                          Salva
                        </Button>
                        <Button className="m-2" variant="secondary" onClick={cancelEdit}>
                          Annulla
                        </Button>
                      </div>
                    ) : (
                      <p className="mt-1 mb-0 p-2 p-1 w-100 rounded-3  bg-secondary text-light ps-3 border-bottom border-3">{comment.comment}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {editComment === true ? ( null) : (
            <div className="w-100  d-flex flex-row align-items-center p-1 border border-2 border-dark rounded-4 my-3">
              <div className="w-100">
                <input
                  className="mt-1 w-100 rounded-4 p-1 ps-3 border border-3 border-dark"
                  type="text"
                  placeholder="Aggiungi un commento..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                
              </div>
              <Button className="w-25 mx-2 my-1 border border-2 border-gray rounded-4" variant="dark" onClick={addComment}>
                Aggiungi
              </Button>
            </div>
          )}
        </>
      )}

    </div>
    </div>
  );
};

export default CardVideos;

