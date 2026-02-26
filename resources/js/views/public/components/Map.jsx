export default function Map() {
    return (
        <>
            <div className="text-center max-w-3xl mx-auto my-15">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Visita{" "}
                    <span className="text-yellow-500">
                        Nuestras Instalaciones
                    </span>
                </h2>
                <p className="mt-4 text-gray-600 text-lg">
                    Usa nuestra ubicación para visitarnos. ¡Te atenderemos con
                    gusto!
                </p>
            </div>
            <div className="w-full h-96 my-5">
                <iframe
                    className="w-full h-full rounded-lg"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.647517292828!2d-98.38368012606392!3d19.21059184773598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfd19345a98fa7%3A0x47e247268f913e02!2sINSTITUTO%20REAL%20DE%20MEXICO%20A.C!5e0!3m2!1ses-419!2smx!4v1770147793233!5m2!1ses-419!2smx"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </>
    );
}
