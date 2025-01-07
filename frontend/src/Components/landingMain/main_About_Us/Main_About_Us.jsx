import React from 'react';

export const Main_About_Us = () => {
    return (
        <main className="bg-gradient-to-br from-indigo-50 to-purple-100 py-16 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-3/5">
                    <h1 className="text-4xl md:text-5xl lg:text-[52px] font-extrabold mb-6 text-gray-800 leading-tight">
                        Acerca De <span className="text-purple-600">Nosotros</span>
                    </h1>
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 space-y-6">
                        <p className="text-lg md:text-xl leading-relaxed text-gray-700">
                            Nuestro <span className="font-bold text-purple-600">servidor de roleplay</span> ofrece una experiencia única donde los jugadores crean y desarrollan sus personajes en un <span className="font-bold text-purple-600">mundo virtual</span> inmersivo. Aquí, puedes vivir una vida virtual y participar en una comunidad activa y realista.
                        </p>
                        <p className="text-lg md:text-xl leading-relaxed text-gray-700">
                            Con roles variados, desde policía hasta empresario, nuestro objetivo es proporcionar un <span className="font-bold text-purple-600">entorno auténtico</span> donde la interpretación de personajes y la creación de historias colaborativas sean el centro de la experiencia.
                        </p>
                        <p className="text-lg md:text-xl font-semibold text-purple-600">
                            Únete a nosotros y descubre un mundo donde tu <span className="font-bold">imaginación</span> es el único límite.
                        </p>
                    </div>
                    <div className="mt-8 space-y-4">
                        <p className="text-2xl font-bold text-gray-800">¿Ya tienes una cuenta? <span className="text-purple-600 font-extrabold">¡Juega ahora!</span></p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition duration-300">
                                Soporte Técnico
                            </button>
                            <button className="bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 transition duration-300">
                                Descargar Launcher
                            </button>
                        </div>
                    </div>
                </div>
                <div className="lg:w-2/5 mt-8 lg:mt-0">
                    <img 
                        src="https://images.unsplash.com/photo-1511882150382-421056c89033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80" 
                        alt="Virtual World Roleplay" 
                        className="rounded-2xl shadow-2xl object-cover w-full h-[500px]"
                    />
                </div>
            </div>
        </main>
    )
}
