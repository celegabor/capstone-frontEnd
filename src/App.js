import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';
import Login from './pages/Login'
import ProtectedRoutes from './middelware/ProtectedRoutes';
import AddUser from './pages/AddUser';
import LandingPage from './pages/LandingPage';
import Contacts from './pages/Contacts';
import About from './pages/About';




const App = ()=>{
  return(
    <BrowserRouter>
      <Routes>

        <Route exact path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contacts" element={<Contacts/>}/>
        <Route path="*" element={<Error />}/>
        <Route path="/addUser" element={<AddUser />}/>

        <Route element={<ProtectedRoutes/>}>
          <Route path="/home" element={<Home/>}/>
        </Route>


      </Routes>
    </BrowserRouter>

  )
}

export default App;

