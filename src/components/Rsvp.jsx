import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import useCountdown from "../hooks/useCountdown";
import '../styles/Invitacion.css';
import fondo from '../assets/fondo.jpg';
import imagen1 from '../assets/portada.jpg';
import Lottie from 'react-lottie';
import animationData from '../assets/brindis.json';
import Slider from "react-slick";
import foto1 from "../assets/fondo.jpg";
import foto2 from "../assets/fondo.jpg";
import foto3 from "../assets/fondo.jpg";
import foto4 from "../assets/fondo.jpg";
import noviosAnimationData from '../assets/novios.json';
import regaloAnimationData from '../assets/regalo.json';
import asistenciaAnimationData from '../assets/mensaje.json';
import redesAnimationData from '../assets/redes.json';
import { FaInstagram } from 'react-icons/fa';
import { confirmarAsistencia } from '../services/confirmarService'
import { obtenerInvitadoPorCodigo } from "../services/invitadoService";
import Contador from './Contador';
import FotoPortada from './FotoPortada';
import Celebracion from './Celebracion';



export default function Rsvp() {
  const { codigo } = useParams();
  const [invitado, setInvitado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mostrarInvitacion, setMostrarInvitacion] = useState(false);
  const [asistencia, setAsistencia] = useState(false);

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [dias, horas, minutos, segundos] = useCountdown(new Date("2025-09-19T19:45:00"));
  const [showModal, setShowModal] = useState(false);

  const [numeroComensales, setNumeroComensales] = useState(0);
  const [mensajeParaNovios, setMensajeParaNovios] = useState("");

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
      await confirmarAsistencia(codigo, invitado.nombreCompleto, numeroComensales, mensajeParaNovios);
      setAsistencia(true);
      alert("¡Gracias por confirmar tu asistencia!");
    } catch (error) {
      console.error("Error al confirmar asistencia:", error);
      alert("Hubo un error. Intenta de nuevo.");
    }
  };

  if (loading) return <p className="text-center text-pink-600">Cargando...</p>;


  // Función para abrir o cerrar el modal
  const toggleModal = () => {
    console.log("Modal Toggled", showModal);  // Esto ayudará a verificar el estado.
    setShowModal(!showModal);
  };

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
        {isPlaying ? "🔇 Pausar música" : "🔊 Reproducir música"}
      </button>

      {!mostrarInvitacion ? (
        <div
          className={`portada ${mostrarInvitacion ? 'h-auto min-h-screen' : ''}`}
          style={{ backgroundImage: `url(${fondo})` }}
        >
          <div className="overlay-box text-center mt-4 p-4">
            <div className="titulo text-center text-black mb-5">
              <h1 className="display-4 fw-bold">Hola, {invitado?.nombreCompleto}</h1>
            </div>
            <h4 className="fw-bold text-uppercase mb-3">Nos hace muy felices que estés invitado a nuestro gran día.</h4>
            <button className="btn-custom" onClick={() => setMostrarInvitacion(true)}>Abrir Invitación</button>
          </div>
        </div>
      ) : (
        <>
          <div className="full-page-scroll">
            {/* Sección 1: Foto */}
            <FotoPortada imagenFotoPortada={imagen1} />
            {/* Sección 2: Frase + Fecha + Contador */}
            <Contador dias={dias} horas={horas} minutos={minutos} segundos={segundos} />

            <section id="ceremonia" className="celebracion-section">
              <div className="celebracion-icon-container">
                <Lottie options={defaultNoviosOptions} height={150} width={150} />
              </div>
              <div className="celebracion-text">
                <p className="subtitulo">Nuestra historia se viste de gala y tú eres parte esencial de ella</p>
                <p className="mt-4 text-center text-gray-700">
                  La ceremonia comenzará a las <strong>19:45</strong>.
                  Prepárate para compartir con nosotros un momento lleno de emoción, promesas y mucho amor.<br/>
                  ¡Nos vemos en <strong>Hacienda Al-Yamanah!</strong>
                </p>
                <a
                    href="https://maps.app.goo.gl/W1HmGLuWLanBvE5VA" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-custom"
                >
                    Ver Ubicación
                </a>
              </div>
            </section>

            {/* Sección: Galería */}
            <section id="galeria" className="historia-section">
              <div className="celebracion-text">
                <div className="mx-auto w-11/12 md:w-3/4 px-4">
                  <Slider
                    dots={false}
                    infinite={true}
                    speed={1000}
                    slidesToShow={4}
                    slidesToScroll={1}
                    autoplay={true}
                    autoplaySpeed={2000}
                    pauseOnHover={true}
                    responsive={[
                      { breakpoint: 1024, settings: { slidesToShow: 3 } },
                      { breakpoint: 768, settings: { slidesToShow: 2 } },
                      { breakpoint: 480, settings: { slidesToShow: 1 } },
                    ]}
                  >
                    {[foto1, foto2, foto3, foto4].map((foto, index) => (
                      <div key={index}>
                        <img
                          src={foto}
                          alt={`Foto ${index + 1}`}
                          className="rounded-xl w-full h-auto object-cover"
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
                <p><br /></p>
              </div>
            </section>

            {/* Sección: Celebración */}
            <Celebracion defaultOptions={defaultOptions} />
            {/* Sección: Regalo */}
            <section id="regalo" className="historia-section">
              <div className="celebracion-icon-container">
                <Lottie options={defaultRegaloOptions} height={200} width={200} />
              </div>
              <div className="celebracion-text">
                <p className="subtitulo">
                  Si deseas hacernos un regalo, además de tu hermosa presencia...
                </p>
                <button onClick={toggleModal} className="btn-custom">
                  Ver Datos Bancarios
                </button>
              </div>

              {/* Modal */}
              {showModal && (
                <div className="custom-modal">
                  <div className="custom-modal-overlay" onClick={toggleModal} />
                  <div className="custom-modal-content">
                    <span className="close" onClick={toggleModal}>&times;</span>
                    <h3>Datos Bancarios</h3>
                    <p>Banco: Banco Ejemplo</p>
                    <p>Cuenta: 1234-5678-9101-1121</p>
                    <p>IBAN: ES12 3456 7890 1234 5678 9101</p>
                    <p>SWIFT: ABCD1234</p>
                  </div>
                </div>
              )}
            </section>

            {/* Sección: Asistencia */}
            <section id="asistencia" className="celebracion-section">
              <div className="celebracion-icon-container">
                <Lottie options={defaultAsistenciaOptions} height={200} width={200} />
              </div>
              <div className="celebracion-text">
                <p className="subtitulo">CONFIRMA TU ASISTENCIA</p>
                <p className="subtitulo">Dí un Sí a nuestra invitación!!!</p>
                <p className="nota-ninos">
                  *Con mucho cariño, les pedimos que este día tan especial sea solo para adultos.
                  Queremos que puedan relajarse, disfrutar y celebrar con nosotros sin preocupaciones.
                </p>
                {asistencia ? (
                  <p className="mensaje-confirmado">✅ Ya confirmaste tu asistencia. ¡Gracias!</p>
                ) : (
                  <form className="form-asistencia" onSubmit={(e) => {
                    e.preventDefault();
                    handleConfirmarAsistencia();
                  }}>
                    <div className="form-group">
                      <label htmlFor="comensales">Número de comensales:</label>
                      <input
                        type="number"
                        id="comensales"
                        min="1"
                        max="10"
                        value={numeroComensales}
                        onChange={(e) => setNumeroComensales(parseInt(e.target.value))}
                        required
                      />
                    </div>

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

            {/* Sección: Redes Sociales */}
            <section id="redes" className="historia-section">
              <div className="celebracion-icon-container">
                <Lottie options={defaultRedesOptions} height={150} width={150} />
              </div>
              <div className="celebracion-text">
                <p className="subtitulo">
                  SI HAY FOTO, HAY HISTORIA
                  <br />
                  <a
                    href="https://instagram.com/xiopalmar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="instagram-link"
                  >
                    <FaInstagram style={{ marginRight: 5 }} />
                    @xiopalmar
                  </a>

                  <a
                    href="https://instagram.com/julioguelop_87"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="instagram-link"
                  >
                    <FaInstagram style={{ marginRight: 5 }} />
                    @julioguelop_87
                  </a>
                </p>
                <p className="subtitulo">
                  Síguenos en Instagram, y etiquétanos en tus fotos y videos
                </p>
                <p className="subtitulo">Comparte tus fotos en nuestro álbum de Google Drive</p>
                <button
                  className="btn-custom"
                  onClick={() =>
                    window.open(
                      'https://drive.google.com/drive/folders/1DFi0ADNAD3jCnewaNbQN2zDzTlpXAqgp?usp=sharing',
                      '_blank'
                    )
                  }
                >
                  Subir fotos
                </button>
              </div>
            </section>

            {/* Sección: Gracias */}
            <section id="gracias" className="celebracion-section">
              <div className="celebracion-text">
                <p className="subtitulo">Gracias por ser parte de este capítulo tan importante de nuestras vidas</p>
              </div>
            </section>
          </div>
          <footer className="footer">
            <p>Un regalo de <strong>Piña 🍍</strong> | Todos los derechos reservados © 2025</p>
          </footer>
        </>
      )}
    </div>
  );
}
