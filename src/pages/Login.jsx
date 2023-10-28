import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'

function Login() {

  const [loginData, setLoginData] = useState({})
  const [login, setLogin] = useState(null)

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
        console.log('vado a home');
        navigate('/home')
      }

      setLogin(data)

    } catch (e) {
      console.log(e);
    }

  }

  return (
    <div className='body d-flex flex-column align-items-center justify-content-center bg-dark text-light '>
      <form onSubmit={onSubmit} className='border border-3 border-light d-flex flex-column p-5 rounded-5' action="">
        <label htmlFor="email">Inserisci la tu Email</label>
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
      </form>

      <div className='mt-5'>
        <button onClick={()=>{
          navigate('/addUser')
        }}>aggiungi utente</button>
      </div>
    </div>
    
  )
}

export default Login