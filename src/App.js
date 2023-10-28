import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';
import Login from './pages/Login'
import ProtectedRoutes from './middelware/ProtectedRoutes';
import AddUser from './pages/AddUser';




const App = ()=>{
  return(
    <BrowserRouter>
      <Routes>

        <Route exact path="/" element={<Login/>}/>
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

