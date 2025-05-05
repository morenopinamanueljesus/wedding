import React, { useEffect, useState, useRef } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import useCountdown from "../hooks/useCountdown";
import './Portada.css';
import fondo from '../assets/fondo.jpg';
import imagen1 from '../assets/1.jpg';
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
import emailjs from 'emailjs-com';

export default function Rsvp() {
  const { codigo } = useParams();
  const [invitado, setInvitado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mostrarInvitacion, setMostrarInvitacion] = useState(false);
  const [asistencia, setAsistencia] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [dias, horas, minutos, segundos] = useCountdown(new Date("2025-09-19T21:00:00"));
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchInvitado = async () => {
      try {
        const docRef = doc(db, "invitados", codigo);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setInvitado(data);
          setAsistencia(data.asistenciaConfirmada || false);
          setMensaje(data.mensaje || "");
        } else {
          console.error("Invitado no encontrado");
        }
      } catch (error) {
        console.error("Error al cargar el invitado:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvitado();
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
      await updateDoc(doc(db, "invitados", codigo), {
        asistenciaConfirmada: true,
      });
      setAsistencia(true);

      await emailjs.send("service_lwixr2b", "template_1e0s3hj", {
        nombre: invitado.nombreCompleto
      }, "80jNXmTMgIDfMp0sk");

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
            <section
              id="foto"
              className="bg-cover bg-center section-principal"
              style={{
                backgroundImage: `url(${imagen1})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <div className="h-full w-full" />
            </section>

            {/* Sección 2: Frase + Fecha + Contador */}
            <section id="contador" className="seccion-contador">
              <div className="frase-romantica">
                <p>“A veces lo que empieza como una locura, se convierte en lo mejor de tu vida.”</p>
              </div>

              <div className="contenido-contador">
                <p className="subtitulo">TE ESPERAMOS EL DÍA</p>
                <h2 className="fecha-evento">19 de Septiembre a las 21:00</h2>

                <div className="contador-grid">
                  <div>
                    <span className="numero">{dias}</span>
                    <div className="etiqueta">Días</div>
                  </div>
                  <div className="separador">:</div>
                  <div>
                    <span className="numero">{horas}</span>
                    <div className="etiqueta">Horas</div>
                  </div>
                  <div className="separador">:</div>
                  <div>
                    <span className="numero">{minutos}</span>
                    <div className="etiqueta">Minutos</div>
                  </div>
                  <div className="separador">:</div>
                  <div>
                    <span className="numero">{segundos}</span>
                    <div className="etiqueta">Segundos</div>
                  </div>
                </div>

                <div className="mt-6">
                  <a
                    href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda+de+Nombre1+y+Nombre2&dates=20250919T190000Z/20250919T230000Z&details=¡Te+esperamos+en+Finca+El+Encanto!&location=Finca+El+Encanto,+Sevilla"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-custom"
                  >
                    Agendar Fecha
                  </a>
                </div>
              </div>
            </section>

            {/* Sección: Celebración */}
            <section id="celebracion" className="celebracion-section">
              <div className="celebracion-icon-container">
                <Lottie options={defaultOptions} height={200} width={200} />
              </div>
              <div className="celebracion-text">
                <p className="subtitulo">CELEBRACIÓN</p>
                <p className="subtitulo">Será un honor contar con tu presencia para brindar por este hermoso momento.<br></br> ¡Nos vemos en Finca El Encanto!</p>
                <a
                  href="https://goo.gl/maps/xyz123" // Aquí va el enlace de Google Maps del lugar
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-custom"
                >
                  Ver Ubicación
                </a>
              </div>
            </section>

            {/* Sección: Galería */}
            <section id="galeria" className="celebracion-section">
              <div className="celebracion-text">
                <p className="subtitulo">NUESTRA HISTORIA</p>
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
                <p></p>
                <div className="celebracion-icon-container">
                  <Lottie options={defaultNoviosOptions} height={150} width={150} />
                </div>
                <div className="celebracion-text">
                  <p className="subtitulo">Nuestra historia se viste de gala</p>
                  <p className="subtitulo">Y TÚ TAMBIÉN!!!</p>
                </div>
              </div>
            </section>

            {/* Sección: Regalo */}
            <section id="regalo" className="celebracion-section">
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
                <button className="btn-custom" onClick={handleConfirmarAsistencia}>
                  Confirmar asistencia
                </button>
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
