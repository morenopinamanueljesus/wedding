const FotoPortada = ({imagenFotoPortada}) => {
    return (
        <section
            id="foto"
            className="bg-cover bg-center section-principal"
            style={{
                backgroundImage: `url(${imagenFotoPortada})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}
        >
            <div className="h-full w-full" />
        </section>
    )
}

export default FotoPortada;