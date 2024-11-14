import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-2xl font-bold mb-4 text-purple-400">SFRP</h3>
                    <p className="text-gray-400">Sumérgete en un mundo lleno de posibilidades donde tu imaginación es el límite.</p>
                </div>
                <div>
                    <h4 className="text-xl font-semibold mb-4 text-purple-400">Enlaces Rápidos</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Inicio</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Acerca de</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Reglas</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Soporte</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-xl font-semibold mb-4 text-purple-400">Comunidad</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Discord</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Foro</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Twitter</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">YouTube</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-xl font-semibold mb-4 text-purple-400">Contacto</h4>
                    <p className="text-gray-400 mb-2">Email: contacto@sfrp.com</p>
                    <button className="bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300">
                        Contactar Soporte
                    </button>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
                <p>&copy; 2024 SFRP. Todos los derechos reservados.</p>
            </div>
        </footer>
    )
}

export default Footer;