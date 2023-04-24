import React from "react";
import { Routes, Route } from "react-router-dom";
import Server from './server'
import Home from './Home'
import Local from './Local'
import Global from './Global'

const AppRoutes = () => {
  return (
    <>
      
      <div style={{padding: '100px 10px 10px'}}>
        <Routes>
           <Route path='/' element={<Home />} /> 
          <Route path='/Local' element={<Local />} />
          <Route path='/Global' element={<Global />} />
          <Route path='server' element={<Server />} />
        </Routes>
      </div>
    </>

    
  );
}

export default AppRoutes;