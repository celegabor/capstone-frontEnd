import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './contacts.css'
import Logo from '../img/JobWork.png'
import './about.css'


const About = ()=> {  

    const navigate = useNavigate();

    return (
        <>
        <nav className="border border-4 border-dark px-5 nav w-100 d-flex align-items-center justify-content-between">
            <img className='logo' src={Logo} alt="" />
            <Button variant='dark p-2 px-4' onClick={() => navigate('/home')}>Torna indietro</Button>
        </nav>
        </>
    )
}

export default About