import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Logo from '../img/JobWork.png';
import './contacts.css';



const Contacts = ()=> {

    const navigate = useNavigate();

    const facebookLink = "https://www.facebook.com/il_tuo_profilo";
    const instagramLink = "https://www.instagram.com/il_tuo_profilo";
    const linkedinLink = "https://www.linkedin.com/in/il_tuo_profilo";
    const twitterLink = "https://twitter.com/il_tuo_profilo";

  return (
    <section className='overflow-hiddden'>
       <nav className="border border-4 border-dark px-5 nav w-100 d-flex align-items-center justify-content-between">
        <img className='logo' src={Logo} alt="" />
        <Button variant='dark p-2 px-4' onClick={() => navigate('/addUser')}>Torna indietro</Button>
      </nav>
      <main className='main-contacts bg-dark d-flex flex-column justify-content-center align-items-center'>
        <h1 className='text-light p-3'>CONTATTI:</h1>
        <div className='w-50 h-50 border rounded-4 text-white d-flex flex-column justify-content-center align-items-center'>
            <p>tel. : 3463760556</p>
            <p>e-mail : celegabor@gmail.com</p>
            <div className='d-flex align-items-center'>
                <p>Social:</p>
                <Button variant="light px-2" className="m-1 fs-3 p-0" href={facebookLink} target="_blank">
                    <FontAwesomeIcon className="m-1 fs-3 p-0" icon={faFacebook} />
                </Button>
                <Button variant="light px-2" className="m-1 fs-3 p-0" href={instagramLink} target="_blank">
                    <FontAwesomeIcon className='mx-2' icon={faInstagram} />
                </Button>
                <Button variant="light px-2" className="m-1 fs-3 p-0" href={linkedinLink} target="_blank">
                    <FontAwesomeIcon className='mx-2' icon={faLinkedin} />

                </Button>
                <Button variant="light px-2" className="m-1 fs-3 p-0" href={twitterLink} target="_blank">
                    <FontAwesomeIcon className='mx-2' icon={faTwitter} />
                </Button>
            </div>
            <div className="w-25 mt-3 d-flex justify-content-between">
                <p>Privacy</p>
                <p>Policy</p>
            </div>
            <p>© copyright: ...</p>
        </div>
      </main>
    </section>
  )
}

export default Contacts