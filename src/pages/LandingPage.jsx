import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Video from '../video/video.mp4';
import './landing.css';
import Logo from '../img/JobWork.png';
import Button from 'react-bootstrap/Button';
import ScambioIMG from '../img/scambio.jpeg';
import Screen from '../img/screen.png';
import Cash from '../img/cash.jpeg';
import Nav from 'react-bootstrap/Nav';



function LandingPage() {
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    setVideoStarted(true);
    localStorage.removeItem('loggedInUser');
  }, []);

  const navigate = useNavigate();

  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <section className="section">
      <nav className="border border-4 border-dark px-5 nav w-100 d-flex align-items-center justify-content-between">
        <img className="logo" src={Logo} alt="" />
        <Button variant="dark" className='button-login-landing p-2 px-4 text-info border border-info' onClick={() => navigate('/addUser')}>
          Crea un tuo profilo
        </Button>
      </nav>

      {/* sezione video sfondo */}
      <video
        className="video border border-5 border-dark"
        ref={videoRef}
        onEnded={handleVideoEnded}
        src={Video}
        autoPlay
        playsInline
        muted
      ></video>
      <div className="filter-video"></div>
      <div className="jumbotron-container d-flex align-items-center justify-content-center">
        <div className="jumbotron text-white border border-dark border-3">
          <h1 className="display-4 w-100 text-center">
            Benvenuti in <b className="border border-dark px-3 p-1">Job<i>Work</i></b>
          </h1>
          <p className='text-center fs-5'>
            Condividi le tue abilità lavorative con gli altri utenti.
          </p>
          <hr className="my-4 text-info" />
          <p className='text-center'>Chiedi informazioni per svolgere un lavoro in tutta sicurezza e per completare al meglio e in autonomia il lavoro che devi svolgere!</p>
        </div>
        <div className="button-container-create w-100 d-flex justify-content-center">
          <Button variant="dark" className="w-50 border border-info p-2 px-4 m-5 text-info" onClick={() => navigate('/login')}>
            Accedi al tuo profilo
          </Button>
        </div>
      </div>

      <main className="p-5 main-landingpage bg-dark text-white">

        <hr className='text-info '></hr>


        <div className="row align-items-center my-5">
          <div className="col-md-6">
            <h2 className="text-center">Cos'è JobWork?</h2>
            <p className="text-custom p-4">
              JobWork è un <i>SITO WEB</i> dedicato a tutte le persone che vogliono scambiare abilità lavorative per essere in grado di svolgere ogni lavoro. <br />In questo modo potrai soddisfare la tua voglia di imparare cose nuove e riuscirai a superare ogni piccola difficoltà domestica che richiede qualche abilità in più.
            </p>
          </div>
          <div className="col-md-6 text-center">
            <img className="images" src={ScambioIMG} alt="img scambio" />
          </div>
        </div>

        <hr className='text-info '></hr>

        <div className="row align-items-center my-5">
          <div className="col-md-6 text-center">
            <img className="images" src={Screen} alt="img scambio" />
          </div>
          <div className="col-md-6">
            <h2 className="text-center">Come funziona?</h2>
            <p className="text-custom p-4">
              Ti basterà creare un tuo profilo personale e caricare i tuoi video, dove spieghi come si possono fare piccoli lavori del tuo settore a livello amatoriale. <br />Puoi navigare nel sito, vedere tutti i contenuti che vuoi, lasciare commenti e inoltre puoi aprire una chat privata con un'altro utente per scambiarvi pareri e opinioni.
            </p>
          </div>
        </div>

        <hr className='text-info '></hr>

        <div className="row align-items-center my-5">
          <div className="col-md-6">
            <h2 className="text-center">Quanto costa JobWork?</h2>
            <p className="text-custom p-4">
              JobWork è un <i>SITO WEB</i> completamente gratuito ideato principalmente per un fine didattico. La community ha solo il 'compito' di condividere brevi video contenenti chicche che potrebbero essere utili per svolgere in autonomia e in totale sicurezza piccoli lavori nella propria quotidianità. 
            </p>
          </div>
          <div className="col-md-6 text-center">
            <img className="images" src={Cash} alt="img scambio" />
          </div>
        </div>

        <hr className='text-info '></hr>

        <div className="pt-5 d-flex flex-column align-items-center">
          <h4 className="w-100 p-5 text-custom text-center">Non hai ancora un profilo? Clicca qui sotto per crearlo subito!!</h4>
          <Button variant="dark" className='border border-info text-info p-2 px-4' onClick={() => navigate('/addUser')}>
            Clicca qua per creare un profilo..
          </Button>
        </div>

        <hr className='mt-5 text-info '></hr>

      </main>
      <footer className="w-100 bg-light text-center w-100">
        <div className="custom-background p-3">
          <Nav className=" justify-content-center" activeKey="/home">
            <Nav.Item>
              <Nav.Link className='text-dark border-bottom border-dark mx-2 rounded-5 border-2' href='/contacts'>Contact Us</Nav.Link>
            </Nav.Item>
          </Nav>
          <div className='w-100 text-center'>
            <img className='logo logo-custom p-0 m-0' src={Logo} alt='logo site'></img>
          </div>
          <div className="text-center mt-4 mb-4">
            <p>Privacy-Policy</p>
            <p className='text-dark'>info@JobWork.it</p>
          </div>

        </div>
      </footer>
    </section>
  );
}

export default LandingPage;

