import { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { PostProvider } from '../../context/context';
import useSession from '../../hooks/useSession';
import { faHammer, faFile , faEdit , faTrash, faCogs, faMessage} from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import './sidebarR.css'


const OffCanvasExample = ({ name, ...props }) => {

    const { showR, setShowR, handleCloseR, handleShowR } = useContext(PostProvider);
    const session = useSession()  
    const [users, setUsers] = useState([]);

    useEffect(() => {
      // Esegui una richiesta GET per ottenere la lista degli utenti dal tuo server
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
    <div className='bg-custom'>
      <Offcanvas show={showR} onHide={handleCloseR} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Qui puoi trovare tutti gli utenti</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Header className='bg-secondary'>
          <Offcanvas.Title>
          {users.map((user) => (
            <>
              {user._id !== session.id ? (
                null
              ) : (
                <div className='d-flex align-items-center'>
                  <div key={user._id} className="user-card w-100 p-3 d-flex align-items-center border-bottom border-1 border-dark ">
                    <img className='img-custom-users object-fit-contain' src={user.avatar} alt={`Avatar di ${user.name}`} />
                    <p className='ms-4'>{user.name} {user.lastName}</p>
                  </div>
                  <div className='d-flex'>
                    <Button variant='secondary' className='border border-dark border-2 mx-2'>
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button variant='secondary' className='border border-dark border-2 mx-2'>
                      <FontAwesomeIcon icon={faCogs} />
                    </Button>
                  </div>
                </div>
              )}
            </>
          ))}
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className='bg-custom text-light'>
          
          <div className="user-list">
          {users.map((user) => (
            <>
              {user._id === session.id ? (
                null
              ) : (
                <div className='d-flex align-items-center'>
                  <div key={user._id} className="user-card w-100 p-3 d-flex align-items-center border-bottom border-1 border-dark ">
                    <img className='img-custom-users object-fit-contain' src={user.avatar} alt={`Avatar di ${user.name}`} />
                    <p className='ms-4'>{user.name} {user.lastName}</p>
                  </div>
                  <Button variant='secondary' className='border border-dark border-2 mx-2'>
                    <FontAwesomeIcon icon={faMessage} />
                  </Button>
                </div>
              )}
            </>
          ))}

          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

function Example() {
  return (
    <>
      {['end'].map((placement, idx) => (
        <OffCanvasExample key={idx} placement={placement} name={placement} />
      ))}
    </>
  );
}

export default Example;