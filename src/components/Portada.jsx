import React, { useState } from 'react';
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import './Portada.css';
import fondo from '../assets/fondo.jpg';

const Portada = () => {
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Buscar en Firestore el documento con el código
      const docRef = doc(db, "invitados", codigo);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Si existe, redirige a la página de confirmación (RSVP)
        navigate(`/rsvp/${codigo}`);
      } else {
        // Si no existe, muestra un mensaje de error
        setError("Código no válido. Intenta de nuevo.");
      }
    } catch (error) {
      setError("Error al verificar el código.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="portada"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="overlay-box p-4 text-center">
        <div className="titulo text-center text-black mb-5">
          <h1 className="display-4 fw-bold">Rocío & Julio</h1>
          <p className="fs-4">19 de Septiembre de 2025</p>
        </div>
        <h4 className="fw-bold text-uppercase mb-3">
          ¡Nos encantaría que seas parte de este día tan especial!
        </h4>
        <p className="mb-4">Ingresa tu código para continuar:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-3 text-center"
            placeholder="Código de invitación"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            required
          />
          <button type="submit" className="btn-custom w-full rounded">Ver invitación</button>
        </form>
      </div>
    </div>
  );
};

export default Portada;

