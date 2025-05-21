import { useState } from "react";
import { Link } from "react-router-dom";
export const Announces = () => {
    const [selectedPost, setSelectedPost] = useState(null);

    const fakePosts = [
        {
            id: 1,
            title: "Nuevo sistema de rangos implementado",
            author: "Admin",
            date: "2025-05-12",
            content: "Ya está disponible el nuevo sistema de rangos para miembros activos. Este sistema incluye una serie de mejoras que permiten ascensos automáticos según la participación en el foro y en los eventos oficiales.",
        },
        {
            id: 2,
            title: "Mantenimiento programado",
            author: "Soporte",
            date: "2025-05-10",
            content: "El servidor estará en mantenimiento el domingo a las 2 AM. Estimamos que la interrupción durará alrededor de 2 horas. Gracias por su comprensión.",
        },
        {
            id: 3,
            title: "Evento de comunidad este fin de semana",
            author: "Eventos",
            date: "2025-05-08",
            content: "Prepárate para el próximo evento con premios únicos y sorpresas. Habrá competencias, desafíos y sorteos. ¡No te lo pierdas!",
        },
    ];

    const closeModal = () => {
        setSelectedPost(null);
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-10 relative">
            <h2 className="text-[28px] font-extrabold mb-10 text-gray-800 text-center">
                Últimas <span className="text-purple-600">noticias</span>
            </h2>
            <Link to="/forum/create_post/announce">Crear post</Link>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {fakePosts.map(post => (
                    <div key={post.id} className="bg-white shadow-md rounded-2xl p-5 transition hover:shadow-lg">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
                        <p className="text-sm text-gray-500 mb-1">
                            {post.author} • {new Date(post.date).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700 text-sm">{post.content.slice(0, 80)}...</p>
                        <div className="mt-4 text-right">
                            <button
                                onClick={() => setSelectedPost(post)}
                                className="text-sm text-purple-600 hover:underline font-medium"
                            >
                                Leer más
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* modal */}
            {selectedPost && (
                <div
                    className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-8 shadow-xl relative animate-fadeIn"
                        onClick={(e) => e.stopPropagation()} // no close clicking inside
                    >
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">{selectedPost.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">
                            {selectedPost.author} • {new Date(selectedPost.date).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedPost.content}</p>
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-xl"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
