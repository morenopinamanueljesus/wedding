import { useState } from 'react';
import { db } from "../services/firebaseService";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import '../styles/Portada.css';
import fondo from '../assets/galeria1.jpg';

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
        console.error("Código no válido. Intenta de nuevo.");
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
      className="principal"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="box-formulario-portada text-center">
          <p className="fs-1 fw-bold">Rocío & Julio</p>
          <p className="fs-5 fw-bold">19 de Septiembre de 2025
          <br/>
            ¡Nos encantaría que seas parte de este día tan especial!
          </p>
          <p className="mb-2">Ingresa tu código para continuar:</p>
          <form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center">
            <input
              type="text"
              className="form-control mb-1 text-center w-75"
              placeholder="Código de invitación"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
            />
            </div>
            {error && (
              <p className="text-danger text-center mb-3">{error}</p>
            )}
            <button type="submit" className="btn-portada w-full rounded">Ver invitación</button>
          </form>
      </div>
    </div>
  );
};

export default Portada;

