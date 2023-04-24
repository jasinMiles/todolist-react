import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from "./AppRoutes";


function App() {
  return (
    <Router>
     <AppRoutes/>
    </Router>
  );
}
export default App;