import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "@Contexts/Main_context";
import { NotLoggedRedirect } from "@Utils_forum_components/NotLoggedRedirect";
import { PostCard } from "@Utils_forum_components/PostCard";
import { getPosts } from "@Utils/getPosts.js";
import { ModalCard } from "@Utils_forum_components/ModalCard";
import { NewError } from "@Utils_forum_components/NewError";
export const Announces = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const section = "announce";
  const [arrayPosts, setArrPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, socket, isSocketReady } = useContext(MyContext);
  const [error, setError] = useState("");
  const closeModal = () => {
    setSelectedPost(null);
  };

  useEffect(() => {
    const callPosts = async () => {
      setError("");
      try{
        const posts = await getPosts(section);
        if(posts){
          setArrPosts(posts);
        }else{
          setError("Hubo un problema al cargar los posts.");
          return;
        }
      }catch(error){
        setError("Hubo un problema al cargar los posts.")
      }finally{
        setLoading(false);
      }
    }
    callPosts();
  }, []);

  //se detecta cuando el socket esa listo y añade los nuevos post al array
  useEffect(() => {
    if (socket.current && isSocketReady) {
      socket.current.emit("joinRoom", section);
      console.log("announces listening");

      const handleReceivePost = (post) => {
        setError("");
        if (post) {
          setArrPosts((prev) => [...prev, post]);
        }
      };

      socket.current.on("receive_post", handleReceivePost);

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
          <h2 className="col-span-full text-center text-gray-500">
            Cargando posts...
          </h2>
        ) : Array.isArray(arrayPosts) && arrayPosts.length > 0 ? (
          arrayPosts
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((post) => (
              <PostCard post={post} key={post._id} setSelectedPost={setSelectedPost} />
            ))
        ) : (
          <h2 className="col-span-full text-center text-gray-500">
            No hay posts disponibles.
          </h2>
        )}
        {error && <NewError message={error}/>}
      </div>

      {/* Modal */}
      {selectedPost && (
        <ModalCard closeModal={closeModal} selectedPost={selectedPost}/>
      )}
    </div>
  );
};
