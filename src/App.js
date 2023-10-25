import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';



const App = ()=>{
  return(
    <BrowserRouter>
      <Routes>

        <Route exact path="/" element={<Home/>}/>
        <Route path="*" element={<Error />}/>

      </Routes>
    </BrowserRouter>

  )
}

export default App;

