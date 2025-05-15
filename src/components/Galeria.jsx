import Slider from "react-slick";
import foto1 from "../assets/galeria1.jpg";
import foto2 from "../assets/galeria2.jpg";
import foto3 from "../assets/galeria3.jpg";
import foto4 from "../assets/fondo.jpg";

const Galeria = ({ }) => {
    return (
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
                            <div key={index} className="px-2">
                                <div className="w-full h-60 md:h-72 lg:h-80 overflow-hidden rounded-xl">
                                    <img
                                        src={foto}
                                        alt={`Foto ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
                <p><br /></p>
            </div>
        </section>
    )
}

export default Galeria;