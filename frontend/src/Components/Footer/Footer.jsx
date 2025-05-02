import React from 'react';

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-[clamp(13px,2vw,14px)] font-bold mb-4 text-purple-400">SFRP</h3>
                    <p className="text-gray-400 text-[clamp(13px,2vw,14px)]">Sumérgete en un mundo lleno de posibilidades donde tu imaginación es el límite.</p>
                </div>
                <div>
                    <h4 className="text-[clamp(14px,2vw,14px)] font-bold mb-4 text-purple-400">Enlaces Rápidos</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-400 text-[clamp(13px,2vw,14px)] hover:text-white transition duration-300">Inicio</a></li>
                        <li><a href="#" className="text-gray-400 text-[clamp(13px,2vw,14px)] hover:text-white transition duration-300">Acerca de</a></li>
                        <li><a href="#" className="text-gray-400 text-[clamp(13px,2vw,14px)] hover:text-white transition duration-300">Reglas</a></li>
                        <li><a href="#" className="text-gray-400 text-[clamp(13px,2vw,14px)] hover:text-white transition duration-300">Soporte</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-[clamp(14px,2vw,14px)] font-bold mb-4 text-purple-400">Comunidad</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-400 text-[clamp(13px,2vw,14px)] hover:text-white transition duration-300">Discord</a></li>
                        <li><a href="#" className="text-gray-400 text-[clamp(13px,2vw,14px)] hover:text-white transition duration-300">Foro</a></li>
                        <li><a href="#" className="text-gray-400 text-[clamp(13px,2vw,14px)] hover:text-white transition duration-300">Twitter</a></li>
                        <li><a href="#" className="text-gray-400 text-[clamp(13px,2vw,14px)] hover:text-white transition duration-300">YouTube</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-[clamp(14px,2vw,14px)] font-bold mb-4 text-purple-400">Contacto</h4>
                    <p className="text-gray-400 mb-2 text-[clamp(13px,2vw,14px)] font-bold">Email: contacto@sfrp.com</p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-[clamp(13px,2vw,14px)]">
                <p>&copy; 2024 SFRP. Todos los derechos reservados.</p>
            </div>
        </footer>
    )
}
