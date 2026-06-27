import { HiSpeakerphone, HiClipboardList, HiShieldCheck } from 'react-icons/hi';
import { Link } from 'react-router-dom';
export const ForumInfo = () => {
  return (
    <div className="w-full bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-[1500px] mx-auto flex flex-col items-center justify-center p-[5%]">
        <h2 className="text-h2 font-extrabold mb-10 text-gray-800 text-center">
          Información de <span className="text-purple-600">nuestro servidor</span>
        </h2>

        <div className="flex flex-col space-y-2 w-[100%] max-w-[800px] pt-0 px-5 pb-5">
          {/* announces */}
          <Link to="/forum/info/announces">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-md hover:bg-purple-50 transition cursor-pointer">
              <HiSpeakerphone className="text-purple-600 mt-1 text-2xl" />
              <div>
                <h4 className="font-semibold text-gray-700">Anuncios</h4>
                <p className="text-sm text-gray-600">Novedades, eventos y noticias importantes del servidor.</p>
              </div>
            </div>
          </Link>

          {/* rules */}
          <Link to="/forum/info/rules">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-md hover:bg-purple-50 transition cursor-pointer">
              <HiShieldCheck className="text-purple-600 mt-1 text-2xl" />
              <div>
                <h4 className="font-semibold text-gray-700">Reglas del servidor</h4>
                <p className="text-sm text-gray-600">Normas básicas y de convivencia. ¡Leelas antes de jugar!</p>
              </div>
            </div>
          </Link>
          {/* updates */}
          <Link to="/forum/info/updates">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-md hover:bg-purple-50 transition cursor-pointer">
              <HiClipboardList className="text-purple-600 mt-1 text-2xl" />
              <div>
                <h4 className="font-semibold text-gray-700">Actualizaciones</h4>
                <p className="text-sm text-gray-600">Cambios recientes, nuevos sistemas y mejoras al servidor.</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
