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
    try {
      await updateDoc(doc(db, "invitados", codigo), {
        asistenciaConfirmada: asistencia,
        mensaje: mensaje,
      });
      alert("¡Gracias por confirmar!");
    } catch (error) {
      console.error("Error al guardar confirmación:", error);
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
            <h2 className="text-2xl font-bold mb-4 text-pink-600">¡Hola, {invitado?.nombreCompleto}!</h2>
            <p className="mb-4 text-gray-700">Nos hace muy felices que estés invitado a nuestro gran día.</p>
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
                <h2 className="fecha-evento">19 de Septiembre</h2>

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

            {/* Nueva Sección: Celebración */}
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
          </div>
        </>
      )}
    </div>
  );
}
