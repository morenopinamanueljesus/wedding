import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Portada from './components/Portada';
import Rsvp from "./components/Rsvp";

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
