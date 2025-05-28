import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "@Contexts/Main_context";
import { NotLoggedRedirect } from "@Utils/NotLoggedRedirect";
export const Announces = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const section = "announce";
  const [arrayPosts, setArrPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, socket, isSocketReady } = useContext(MyContext);

  const closeModal = () => {
    setSelectedPost(null);
  };

  useEffect(() => {
    const getAnnouncePosts = async () => {
      try {
        // const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:3000/forum/posts/get-posts/${section}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setArrPosts(data.posts);
        } else {
          console.warn("Error al obtener posts:", response.statusText);
        }
      } catch (error) {
        console.error("Error al hacer fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    getAnnouncePosts();
  }, []);

  //se detecta cuando el socket esa listo y añade los nuevos post al array
  useEffect(() => {
    if (socket.current && isSocketReady) {
      socket.current.emit("joinRoom", section); // Unirme a la room
      console.log("announces listening");

      const handleReceivePost = (post) => {
        if (post) {
          setArrPosts((prev) => [...prev, post]);
        } else {
          console.log("error con post");
        }
      };

      socket.current.on("receive_post", handleReceivePost);

      // 💡 Limpieza del listener para evitar duplicados
      return () => {
        socket.current.off("receive_post", handleReceivePost);
      };
    }
  }, [isSocketReady]);

  //protect route from front
  if (!user.user || !user.isLogged) {
    return <NotLoggedRedirect />;
  }


  return (
    <div className="max-w-5xl mx-auto px-4 py-10 relative">
      <h2 className="text-[28px] font-extrabold mb-10 text-gray-800 text-center">
        Últimas <span className="text-purple-600">noticias</span>
      </h2>

      <div className="mb-6 text-right">
        <Link
          to="/forum/create_post/announce"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition"
        >
          Crear post
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-gray-500">
            Cargando posts...
          </div>
        ) : Array.isArray(arrayPosts) && arrayPosts.length > 0 ? (
          arrayPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-md rounded-2xl p-5 transition hover:shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {post.title}
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                {post.author} • {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700 text-sm">
                {/* {post.description.slice(0, 80)}... */}
                {String(post.description).slice(0, 80)}...
              </p>
              <div className="mt-4 text-right">
                <button
                  onClick={() => setSelectedPost(post)}
                  className="text-sm text-purple-600 hover:underline font-medium"
                >
                  Leer más
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No hay posts disponibles.
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-8 shadow-xl relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedPost.title}
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              {selectedPost.author} •{" "}
              {new Date(selectedPost.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {selectedPost.description}
            </p>
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
