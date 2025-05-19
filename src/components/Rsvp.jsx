import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import useCountdown from "../hooks/useCountdown";
import '../styles/Invitacion.css';
import imagen1 from '../assets/portada.jpg';
import Lottie from 'react-lottie';
import animationData from '../assets/brindis.json';
import noviosAnimationData from '../assets/novios.json';
import regaloAnimationData from '../assets/regalo.json';
import asistenciaAnimationData from '../assets/mensaje.json';
import redesAnimationData from '../assets/redes.json';
import { confirmarAsistencia } from '../services/confirmarService'
import { obtenerInvitadoPorCodigo } from "../services/invitadoService";
import Contador from './Contador';
import FotoPortada from './FotoPortada';
import Celebracion from './Celebracion';
import Ceremonia from './Ceremonia';
import Galeria from "./Galeria";
import Regalo from "./Regalo";
import Redes from "./Redes";
import Gracias from "./Gracias";
import Invitacion from "./Acceso";

export default function Rsvp() {
  const { codigo } = useParams();
  const [invitado, setInvitado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mostrarInvitacion, setMostrarInvitacion] = useState(false);
  const [nombresComensales, setNombresComensales] = useState([]);
  const [asistencia, setAsistencia] = useState(false);

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [dias, horas, minutos, segundos] = useCountdown(new Date("2025-09-19T19:45:00"));

  const [numeroComensales, setNumeroComensales] = useState(0);
  const [mensajeParaNovios, setMensajeParaNovios] = useState("");

  const handleNumeroComensalesChange = (e) => {
    const value = parseInt(e.target.value);
    setNumeroComensales(e.target.value); 

    if (!isNaN(value) && value > 0) {
      const nuevosNombres = Array.from({ length: value }, (_, i) => nombresComensales[i] || '');
      setNombresComensales(nuevosNombres);
    } else {
      setNombresComensales([]);
    }
  };

  const handleNombreChange = (index, value) => {
    const nuevos = [...nombresComensales];
    nuevos[index] = value;
    setNombresComensales(nuevos);
  };

  useEffect(() => {
    const cargarInvitado = async () => {
      try {
        const data = await obtenerInvitadoPorCodigo(codigo);
        if (data) {
          setInvitado(data);
          setAsistencia(data.asistenciaConfirmada || false);
        }
      } catch (error) {
        console.error("Error al cargar el invitado:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarInvitado();
  }, [codigo]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => { });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleConfirmarAsistencia = async () => {
    if (asistencia) {
      alert("Ya has confirmado tu asistencia.");
      return;
    }

    try {
      await confirmarAsistencia(codigo, invitado.nombreCompleto, numeroComensales, mensajeParaNovios, nombresComensales);
      setAsistencia(true);
      alert("¡Gracias por confirmar tu asistencia!");
    } catch (error) {
      console.error("Error al confirmar asistencia:", error);
      alert("Hubo un error. Intenta de nuevo.");
    }
  };

  if (loading) return <p className="text-center text-pink-600">Cargando...</p>;


  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const defaultNoviosOptions = {
    loop: true,
    autoplay: true,
    animationData: noviosAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const defaultRegaloOptions = {
    loop: true,
    autoplay: true,
    animationData: regaloAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const defaultAsistenciaOptions = {
    loop: true,
    autoplay: true,
    animationData: asistenciaAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const defaultRedesOptions = {
    loop: true,
    autoplay: true,
    animationData: redesAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="relative">
      <audio ref={audioRef} loop src="/music.mp3" autoPlay />
      <button className="music-control" onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "🔇" : "🔊"}
      </button>

      {!mostrarInvitacion ? (
        <Invitacion
          nombreCompleto={invitado?.nombreCompleto}
          mostrarInvitacion={mostrarInvitacion}
          setMostrarInvitacion={setMostrarInvitacion} />
      ) : (
        <>
          <div className="full-page-scroll">
            {/* Sección 1: Foto */}
            <FotoPortada imagenFotoPortada={imagen1} />
            {/* Sección 2: Frase + Fecha + Contador */}
            <Contador dias={dias} horas={horas} minutos={minutos} segundos={segundos} />
            {/* Sección 3: Ceremonia */}
            <Ceremonia defaultOptions={defaultNoviosOptions} />
            {/* Sección 4: Galería */}
            <Galeria />
            {/* Sección 5: Celebración */}
            <Celebracion defaultOptions={defaultOptions} />
            {/* Sección 6: Regalo */}
            <Regalo defaultOptions={defaultRegaloOptions} />
            {/* Sección 7: Asistencia */}
            <section id="asistencia" className="celebracion-section">
              <div className="celebracion-icon-container">
                <Lottie options={defaultAsistenciaOptions} height={200} width={200} />
              </div>
              <div className="celebracion-text">
                <p className="subtitulo">CONFIRMA TU ASISTENCIA ANTES DEL <br /><strong>2 DE SEPTIEMBRE</strong></p>
                <p className="subtitulo">Dí un Sí a nuestra invitación!!!</p>
                <p className="nota-ninos">
                  *Con mucho cariño, les pedimos que este día tan especial sea solo para adultos.
                  Queremos que puedan relajarse, disfrutar y celebrar con nosotros sin preocupaciones.
                </p>
                {asistencia ? (
                  <p className="subtitulo">✅ Ya confirmaste tu asistencia. ¡Gracias!</p>
                ) : (
                  <form
                    className="form-asistencia"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleConfirmarAsistencia();
                    }}
                  >
                    <div className="form-group">
                      <label htmlFor="comensales">Número de asistentes:</label>
                      <input
                        type="number"
                        id="comensales"
                        min="1"
                        max="10"
                        value={numeroComensales}
                        onChange={handleNumeroComensalesChange}
                        required
                      />
                    </div>

                    {nombresComensales.map((nombre, index) => (
                      <div className="form-group" key={index}>
                        <label>Nombre y apellidos del asistente {index + 1}:</label>
                        <input
                          type="text"
                          value={nombre}
                          onChange={(e) => handleNombreChange(index, e.target.value)}
                          required
                        />
                      </div>
                    ))}

                    <div className="form-group">
                      <label htmlFor="mensaje">Mensaje para los novios:</label>
                      <textarea
                        id="mensaje"
                        rows="4"
                        value={mensajeParaNovios}
                        onChange={(e) => setMensajeParaNovios(e.target.value)}
                        placeholder="Déjanos unas palabras bonitas..."
                      ></textarea>
                    </div>

                    <button type="submit" className="btn-custom">Confirmar asistencia</button>
                  </form>
                )}
              </div>
            </section>
            {/* Sección 8: Redes Sociales */}
            <Redes defaultOptions={defaultRedesOptions} />
            {/* Sección 9: Gracias */}
            <Gracias />
          </div>
          <footer className="footer">
            <p>Un regalo de <strong>Piña 🍍</strong> | Todos los derechos reservados © 2025</p>
          </footer>
        </>
      )}
    </div>
  );
}
