import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Video from '../video/video.mp4'
import './login.css'

function Login() {

  const [loginData, setLoginData] = useState({})
  const [message, setMessage] = useState('')
  const [login, setLogin] = useState(null)
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRef = useRef(null); 
  const navigate = useNavigate()

  const handleInputChange = (e)=>{
    const {name, value} = e.target;

    setLoginData({
      ...loginData,
      [name]: value
    })
  }

  const onSubmit = async (e)=>{
    e.preventDefault()

    try {
      
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/login`, {
        headers:{
          "Content-Type":"application/json"
        },
        method: 'POST',
        body: JSON.stringify(loginData)
      })
      const data = await response.json()

      if(data.token){
        localStorage.setItem('loggedInUser', JSON.stringify(data.token))
        navigate('/home')

      } else {
        setMessage('Credenziali NON valide, ricontrolla email e password..');
        setTimeout(() => {
          setMessage('')
        }, 25000);
      }

      setLogin(data)

    } catch (e) {
      console.log(e);
    }

  }

  const redirectHandlerGitHub = ()=>{
    window.location.href = `${process.env.REACT_APP_SERVER_BASE_URL}/auth/github`
  }
  const redirectHandlerGoogle = ()=>{
    window.location.href = `${process.env.REACT_APP_SERVER_BASE_URL}/auth/google`
  }
  

  useEffect(() => {
    setVideoStarted(true);
  }, []);


  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };


  return (
    <>
      <nav className='bg-dark p-5 pb-0'>
        <Button variant='secondary border border-light p-2 px-4' onClick={() => navigate('/')}>Torna indietro</Button>
      </nav>
      <div className='body d-flex flex-column align-items-center justify-content-center bg-dark text-light'>
        <form onSubmit={onSubmit} className='z-3 bg-form-custom border border-3 border-light d-flex flex-column p-5 rounded-5' action="">
          <label htmlFor="email">Inserisci la tua Email</label>
          <input 
          type="email" 
          name="email" 
          required 
          onChange={handleInputChange}
  />
          <label htmlFor="password" className='mt-5'>Inserisci la tua Password</label>
          <input 
          type="password" 
          name="password" 
          required 
          onChange={handleInputChange}
  />

          <div className='d-flex justify-content-center'>
            <button className='w-50 mt-4 bg-dark text-light rounded-4 border border-light' type='submit'>Accedi</button>
          </div>
          <div className="message-container w-100 text-center text-white">
                {message && <div className={message.includes('NON') ? 'message-alert-login' : 'message-login'}>{message}</div>}
              </div>
        </form>

        <video
          className="video border border-5 border-dark"
          ref={videoRef}
          onEnded={handleVideoEnded} 
          src={Video}
          autoPlay
          muted={true}
        ></video>
        <div className="filter-video"></div>
        <div className='mt-5 w-100 text-center z-3'>
          <Button className='border border-light w-25 p-3 px-4' variant='secondary' onClick={()=>{
            navigate('/addUser')
          }}>aggiungi utente</Button>
        </div>
        <div className="d-flex">
          <Button onClick={()=>redirectHandlerGitHub()} className='custom-login mx-4 z-2 bg-dark text-white'>
            <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="logo gitHub" />
              login with GitHub
          </Button>
          <Button onClick={()=>redirectHandlerGoogle()} className='custom-login mx-4 z-2 bg-dark text-white'>
            <img src="https://img.freepik.com/free-icon/google_318-258888.jpg?w=2000" alt="logo gitHub" />

              login with Google
          </Button>

        </div>

      </div>
    </>
    
  )
}

export default Login