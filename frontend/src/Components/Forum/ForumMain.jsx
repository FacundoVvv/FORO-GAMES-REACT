import React from 'react';
import { Link } from 'react-router-dom';
import {
  HiInformationCircle,
  HiQuestionMarkCircle,
  HiExclamationCircle,
  HiUserGroup,
  HiChatAlt2,
  HiUpload
} from 'react-icons/hi';

export const ForumMain = () => {
  return (
    <main className="bg-gradient-to-br from-indigo-50 to-purple-100 py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[28px] font-extrabold mb-10 text-gray-800 text-center">
          Secciones del <span className="text-purple-600">Foro</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Primera sección */}
          <section className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <h3 className="text-xl font-bold text-purple-600 mb-4 cursor-pointer">Soporte y Comunidad</h3>
            <div className="space-y-4">
              <Link to="/forum/info">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-100 hover:bg-purple-50 transition cursor-pointer">
                  <HiInformationCircle className="text-purple-600 mt-1 text-2xl" />
                  <div>
                    <h4 className="font-semibold text-gray-700">Información</h4>
                    <p className="text-sm text-gray-600">Actualizaciones, anuncios y reglas del servidor.</p>
                  </div>
                </div>
              </Link>
              <Link to="/forum/help">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-100 hover:bg-purple-50 transition cursor-pointer">
                  <HiQuestionMarkCircle className="text-purple-600 mt-1 text-2xl" />
                  <div>
                    <h4 className="font-semibold text-gray-700">Dudas</h4>
                    <p className="text-sm text-gray-600">Preguntas frecuentes y ayuda entre usuarios.</p>
                  </div>
                </div>
              </Link>
              <Link to="/forum/reports">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-100 hover:bg-purple-50 transition cursor-pointer">
                  <HiExclamationCircle className="text-purple-600 mt-1 text-2xl" />
                  <div>
                    <h4 className="font-semibold text-gray-700">Reportes</h4>
                    <p className="text-sm text-gray-600">Reportes de bugs o problemas con otros jugadores.</p>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* Segunda sección */}
          <section className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <h3 className="text-xl font-bold text-purple-600 cursor-pointer mb-4">Contenido del Servidor</h3>
            <div className="space-y-4">
              <Link to="/forum/roles">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-100 hover:bg-purple-50 transition cursor-pointer">
                  <HiUserGroup className="text-purple-600 mt-1 text-2xl" />
                  <div>
                    <h4 className="font-semibold text-gray-700">Roles de la comunidad</h4>
                    <p className="text-sm text-gray-600">Historias, personajes y desarrollo de roles.</p>
                  </div>
                </div>
              </Link>
              <Link to="/forum/generalDiscussions">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-100 hover:bg-purple-50 transition cursor-pointer">
                  <HiChatAlt2 className="text-purple-600 mt-1 text-2xl" />
                  <div>
                    <h4 className="font-semibold text-gray-700">Posteos generales</h4>
                    <p className="text-sm text-gray-600">Charlas, ideas y debates abiertos.</p>
                  </div>
                </div>
              </Link>
              <Link to="forum/contributions">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-100 hover:bg-purple-50 transition cursor-pointer">
                  <HiUpload className="text-purple-600 mt-1 text-2xl" />
                  <div>
                    <h4 className="font-semibold text-gray-700">Aportes al servidor</h4>
                    <p className="text-sm text-gray-600">Propuestas, sugerencias y contenido de la comunidad.</p>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};
