import React from 'react';
import { Link } from 'react-router-dom';
export const InterestInfo = () => {
    return (
        <section className="bg-gradient-to-br from-indigo-50 to-purple-100 py-16 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-[36px] sm:text-[28px] font-extrabold mb-10 text-gray-800 leading-tight">
                    Información de <span className="text-purple-600">Interés</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white rounded-2xl shadow-xl p-8 space-y-4">
                        <h3 className="text-[18px] font-bold text-purple-600 tracking-wide">Reglas del Servidor</h3>
                        <ul className="text-[15px] list-disc pl-5 text-gray-700 space-y-2">
                            <li>Respeta a todos los jugadores y staff.</li>
                            <li>Mantén tu personaje en todo momento (no OOC en IC).</li>
                            <li>Evita el uso de cheats o mods no autorizados.</li>
                            <li>No hagas spam ni flood en el chat.</li>
                        </ul>
                    </div>
                    <div className="bg-white rounded-2xl shadow-xl p-8 space-y-4">
                        <h3 className="text-[18px] font-bold text-purple-600 tracking-wide">Consejos de Rol</h3>
                        <ul className="text-[15px] list-disc pl-5 text-gray-700 space-y-2">
                            <li>Desarrolla un trasfondo para tu personaje.</li>
                            <li>Interactúa con otros jugadores de manera realista.</li>
                            <li>Usa el entorno para enriquecer tus escenas.</li>
                            <li>Acepta situaciones imprevistas como parte del juego.</li>
                        </ul>
                    </div>
                    <div className="bg-white rounded-2xl shadow-xl p-8 space-y-4">
                        <h3 className="text-[18px] font-bold text-purple-600 tracking-wide">Tutoriales</h3>
                        <p className="text-[14px] font-semibold text-gray-700">Visita nuestro canal de YouTube para acceder a tutoriales sobre:</p>
                        <ul className="text-[15px] list-disc pl-5 text-gray-700 space-y-2">
                            <li>Cómo crear tu primer personaje</li>
                            <li>Guía de comandos básicos</li>
                            <li>Cómo iniciar tu propio negocio en el servidor</li>
                            <li>Tips para mejorar tu experiencia de juego</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 text-center">
                    <Link to="/more-info">
                        <button className="bg-purple-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-purple-700 transition duration-300">
                            Más Información
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
