import React from 'react';

const Contador = ({ dias, horas, minutos, segundos }) => {
  return (
    <section id="contador" className="seccion-contador">
      <div className="celebracion-section">
        <div className="celebracion-text">
          <p className="subtitulo"><strong>¡Después de 10 años, al fin... nos casamos! 🎉</strong></p>
          <p className="subtitulo-texto">No prometemos un cuento de hadas, pero sí una buena fiesta.<br />
            Queremos compartir con vosotros este momento tan especial, a nuestra manera:
            sin protocolos, sin prisas y con muchas ganas de celebrar. <br />
            Para brindar por el amor, la paciencia, y las decisiones que se cocinan a fuego lento.</p>
        </div>
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
            href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda+de+Rocío+y+Julio&dates=20250919T174500Z/20250919T230000Z&details=¡Te+esperamos+en+Hacienda+Al-Yamanah!&location=Hacienda+Al-Yamanah,+Sevilla"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-custom"
          >
            Agendar Fecha
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contador;