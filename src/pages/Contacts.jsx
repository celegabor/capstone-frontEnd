import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Logo from '../img/JobWork.png';
import './contacts.css';



const Contacts = ()=> {

    const navigate = useNavigate();

    const facebookLink = "https://www.facebook.com";
    const instagramLink = "https://www.instagram.com";
    const linkedinLink = "https://www.linkedin.com";
    const twitterLink = "https://twitter.com";

  return (
    <section className='overflow-hiddden'>
       <nav className="border border-4 border-dark px-5 nav w-100 d-flex align-items-center justify-content-between">
        <img className='logo' src={Logo} alt="" />
        <Button variant='dark' className='border border-info border-3 text-info p-2 px-5' onClick={() => navigate('/home')}>Torna indietro</Button>
      </nav>
      <main className='main-contacts-height bg-secondary d-flex flex-column justify-content-center align-items-center w-100'>
        <h1 className='text-info p-3'>CONTATTI:</h1>
        <div className='border border-info border-5 bg-dark w-100 w-contacts-custom h-50 border rounded-4 text-white d-flex flex-column justify-content-center align-items-center'>
            <p>tel. : 3463760556</p>
            <p>e-mail : celegabor@gmail.com</p>
            <div className='d-flex align-items-center'>
                <p>Social:</p>
                <Button variant="light px-2" className="m-1 fs-3 p-0" href={facebookLink} target="_blank">
                    <FontAwesomeIcon className="text-primary m-1 fs-3 p-0" icon={faFacebook} />
                </Button>
                <Button variant="light px-2" className="text-danger m-1 fs-3 p-0" href={instagramLink} target="_blank">
                    <FontAwesomeIcon className='mx-2' icon={faInstagram} />
                </Button>
                <Button variant="light px-2" className="text-info m-1 fs-3 p-0" href={linkedinLink} target="_blank">
                    <FontAwesomeIcon className='mx-2' icon={faLinkedin} />

                </Button>
                <Button variant="light px-2" className="text-primary m-1 fs-3 p-0" href={twitterLink} target="_blank">
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