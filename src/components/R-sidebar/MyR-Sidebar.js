import { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { PostProvider } from '../../context/context';
import useSession from '../../hooks/useSession';
import { faMessage, faEdit, faCogs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MessagePopup from '../messagePopup/messagePopup';
import './sidebarR.css';
import { useNavigate, Link } from 'react-router-dom';

const OffCanvasRight = ({ name, ...props }) => {

  const { showR, setShowR, handleCloseR, handleShowR } = useContext(PostProvider);
  const session = useSession();
  const [users, setUsers] = useState([]);
  const [messageRecipient, setMessageRecipient] = useState(null);

  const handleShowMessagePopup = (userId, userName, userLastName, userAvatar, fromName, fromLastName, fromAvatar) => {
    setMessageRecipient({
      from: session.id,
      to: userId,
      name: userName,
      lastName: userLastName,
      avatar: userAvatar,
      fromName: fromName,
      fromLastName: fromLastName,
      fromAvatar: fromAvatar,
    });

    console.log(fromName,fromLastName,fromAvatar);
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users2/get`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
      })
      .catch((error) => {
        console.error('Errore nel recupero degli utenti:', error);
      });
  }, []);

  return (
    <>
      <div className='bg-custom'>
        <Offcanvas show={showR} onHide={handleCloseR} {...props}>
          <Offcanvas.Header closeButton key="offcanvas-header">
            <Offcanvas.Title>Qui puoi trovare tutti gli utenti</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Header key="user-list-header" className='bg-secondary'>
            <Offcanvas.Title>
              {users.map((user) => (
                <div key={user._id}>
                  {user._id === session.id ? (
                    <div className='d-flex align-items-center'>
                      <div key={user._id} className="user-card w-100 p-3 d-flex align-items-center border-bottom border-1 border-dark">
                        <Link className='w-100 d-flex align-items-center text-dark text-decoration-none' to={`/user`}>
                          <img className='img-custom-users object-fit-contain' src={user.avatar} alt={`Avatar di ${user.name}`} />
                          <p className='ms-2'>{user.name} {user.lastName}</p>
                        </Link>
                      </div>
                      <div className='d-flex'>
                         <Button variant='secondary' className='border border-dark border-2 mx-2' onClick={() => {
                           navigate('/user');
                         }}>
                           <FontAwesomeIcon icon={faEdit} />
                         </Button>
                         {/* <Button variant='secondary' className='border border-dark border-2 mx-2'>
                           <FontAwesomeIcon icon={faCogs} />
                         </Button> */}
                       </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body className='bg-custom text-light'>
            <div className="user-list">
              {users.map((user) => (
                <div key={user._id}>
                  {user._id === session.id ? (
                    null
                  ) : (
                    <div className='d-flex align-items-center'>
                      <Link className='w-100 text-light text-decoration-none ' to={`/getUserId/${user._id}`}>
                        <div key={user._id} className="user-card w-100 p-3 d-flex align-items-center border-bottom border-1 border-dark">
                          <img className='img-custom-users object-fit-contain border border-1' src={user.avatar} alt={`Avatar di ${user.name}`} />
                          <p className='ms-4'>{user.name} {user.lastName}</p>
                        </div>
                      </Link>
                      <div className='d-flex'>
                        <Button variant='secondary' className='border border-dark border-2 mx-2' onClick={() => handleShowMessagePopup(user._id, user.name, user.lastName, user.avatar, session.name, session.lastName, session.avatar)}>
                          <FontAwesomeIcon icon={faMessage} />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Offcanvas.Body>

        </Offcanvas>
      </div>
      {messageRecipient && (
        <MessagePopup
          show={true}
          onHide={() => setMessageRecipient(null)}
          from={messageRecipient.from}
          to={messageRecipient.to}
          name={messageRecipient.name}
          lastName={messageRecipient.lastName}
          avatar={messageRecipient.avatar}
          fromName={messageRecipient.fromName}
          fromLastName={messageRecipient.fromLastName}
          fromAvatar={messageRecipient.fromAvatar}
        />
      )}
    </>
  );
}

function Right() {
  return (
    <>
      {['end'].map((placement, idx) => (
        <OffCanvasRight key={idx} placement={placement} name={placement} />
      ))}
    </>
  );
}

export default Right;