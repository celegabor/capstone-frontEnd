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
import Success from './pages/Success';
import User from './pages/User';
import GetUserId from './pages/GetUserId';





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
        <Route path="/success/:token" element={<Success />}/>


        <Route element={<ProtectedRoutes/>}>
          <Route path="/home" element={<Home/>}/>
          <Route path="/user" element={<User/>}/>
          <Route path="/getUserId/:userId" element={<GetUserId/>}/>
        </Route>


      </Routes>
    </BrowserRouter>

  )
}

export default App;

