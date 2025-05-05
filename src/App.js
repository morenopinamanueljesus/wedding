import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Portada from './components/Portada';
import Rsvp from "./components/Rsvp";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portada />} />
        <Route path="/rsvp/:codigo" element={<Rsvp />} />
      </Routes>
    </Router>
  );
}

export default App;
