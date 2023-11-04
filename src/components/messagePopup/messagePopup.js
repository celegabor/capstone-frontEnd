import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import './message.css';

function MessagePopup({ show, onHide, from, to, name, lastName, avatar, fromName, fromLastName, fromAvatar }) {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGetMessage = async () => {
        setIsLoading(true);
        await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/message/get`)
            .then((response) => response.json())
            .then((data) => {
                setMessages(data.message);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Errore nel recupero dei messaggi:', error);
                setIsLoading(false);
            });
    }

    const myMessages = messages.filter(
        (message) =>
            (message.from._id === from && message.to === to) ||
            (message.from._id === to && message.to === from)
    ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    const handleCreateMessage = () => {
        const messageData = {
            from: from,
            to: to,
            message: newMessage,
        };

        fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/message/post`, {
            method: 'POST',
            body: JSON.stringify(messageData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setChatMessages([...chatMessages, data.payload]);
                setNewMessage('');
                handleGetMessage()
            })
            .catch((error) => {
                console.error('Errore nella creazione del messaggio:', error);
            });
    };

    useEffect(() => {
        if (show) {
            handleGetMessage();
        }
    }, [show]);

    return (
        <>
            {isLoading ? (
                <div key={new Date().getTime() + 'loading'} className="d-flex align-items-center justify-content-center text-grey spinner-custom">
                    <Spinner className="text-white" animation="border" role="status" key="spinner">
                    </Spinner>
                    <p className="fs-5 text-white m-3" key="loading-text">Caricamento...</p>
                </div>
            ) : (
                <Modal className='container-popup-message' show={show} onHide={onHide} centered>
                    <div className='message-popup'>
                        <Modal.Header className='bg-dark border border-3 border-light text-light' closeButton key="modal-header">
                            La tua chat con <b className='ms-1'><i>{name} {lastName}</i></b>
                        </Modal.Header>
                        <Modal.Body className='h-100 bg-dark border border-3 border-light text-light' key="modal-body">
                            <div key={from}>
                                <ul>
                                    {myMessages.map((message) => (
                                        <React.Fragment key={message._id}>
                                            {message ? (
                                                <>
                                                    {message.from._id === from ? (

                                                        // messaggi utente mio
                                                    <li
                                                        key={message._id}
                                                        className='my-message'
                                                    >
                                                        <div className='d-flex align-items-center justify-content-end m-0'>
                                                            <p className='ms-2 mt-3 text-light'>{fromName} {fromLastName}</p>
                                                            <img width='50px' height='50px' src={fromAvatar} alt='img avatar' className='avatar-image rounded-5 border border-secondary border-2' />
                                                        </div>
                                                        <div className='d-flex justify-content-end'>
                                                            <p className='m-0 bg-light text-dark text-center w-50 p-1 rounded-2'>
                                                                {message.message}
                                                            </p>
                                                        </div>
                                                        <br />
                                                        <div className='d-flex justify-content-end'>
                                                            <p className='timestamp-custom ms-5'>
                                                                {new Date(message.timestamp).toLocaleString()}
                                                            </p>
                                                        </div>
                                                    </li>
                                                    ):(

                                                        // altro utente
                                                        <li
                                                        key={message._id}
                                                        className='other-message'
                                                    >
                                                        <div className='d-flex align-items-center'>
                                                            <img width='50px' height='50px' src={avatar} alt='img avatar' className='avatar-image rounded-5 border border-secondary border-2' />
                                                            <p className='ms-2 mt-3 text-secondary'>{name}{lastName}</p>
                                                        </div>
                                                        <div className='d-flex justify-content-start'>
                                                            <p className='bg-secondary text-light text-center w-50 p-1 rounded-2'>
                                                                {message.message}
                                                            </p>
                                                        </div>
                                                        <br />
                                                        <div className='d-flex justify-content-start'>
                                                            <p className='timestamp-custom'>
                                                                {new Date(message.timestamp).toLocaleString()}
                                                            </p>
                                                        </div>
                                                    </li>
                                                    )}
                                                </>
                                                
                                            ) : (
                                                <p key="no-messages">Scrivi un messaggio per aprire una chat con {name} {lastName}</p>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </ul>
                                <div className='d-flex w-100 aliogn-items-center'>
                                    <div className='d-flex flex-column w-100'>
                                        <input
                                            className='p-2 m-2 rounded-2'
                                            required
                                            type="text"
                                            placeholder='scrivi qui il tuo messaggio'
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                        />
                                    </div>
                                    <Button variant='light my-2' onClick={handleCreateMessage} key="create-message-button">Crea</Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </div>
                </Modal>
            )}
        </>
    );
}

export default MessagePopup;
