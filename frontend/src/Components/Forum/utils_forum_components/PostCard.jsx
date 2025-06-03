import { HiDocumentText } from "react-icons/hi";
import { Reactions } from "./Reactions/Reactions";
import { useEffect, useRef, useState, useContext } from "react";
import { MyContext } from "@Contexts/Main_context";
import { NewError } from "./NewError";

export const PostCard = ({ post, setSelectedPost }) => {
  const [showReactions, setShowReactions] = useState(false);
  const [error, setError] = useState("");
  const iconsDivRef = useRef(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { user } = useContext(MyContext);
  const [myReactionType, setMyReactionType] = useState("");
  //DOM CHECK
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (iconsDivRef.current && !iconsDivRef.current.contains(event.target)) {
        setShowReactions(false);
      }
    };

    if (showReactions) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showReactions]);

  //REACT POST LOGIC
  const handleReaction = async (react_id) => {
    setError("");

    if (!user.user || !user.isLogged) {
      console.log(user)
      setError("Debes iniciar sesión para reaccionar.");
      return;
    }

    const user_id = user.user._id;

    try {
      const response = await fetch(`${BACKEND_URL}/forum/posts/react-post/${post._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ react_id, user_id }),
      });

      if (!response.ok) {

        if (response.status === 400) {
          setError(data?.message || "Datos inválidos.");
        } else if (response.status === 401) {
          setError("No autorizado. Inicia sesión nuevamente.");
        } else if (response.status === 500) {
          setError("Error del servidor. Intenta más tarde.");
        } else {
          setError("Ocurrió un error inesperado.");
        }

        return;
      }
      
      //el servidor ya añadio tu reaccion al post y el post a tus reacciones collection en user schema
      // console.log("paree q todo salio bien:"+ await response.json())
      setMyReactionType(react_id);
    } catch (e) {
      console.error("Error en la solicitud:", e);
      setError("No se pudo conectar con el servidor.");
    }
  };

  //detect user reactions on every cardPosts
  useEffect(() => {
    if (!user?.user?.activity?.reacted_posts || !post?._id) return;
  
    const reaction = user.user.activity.reacted_posts.find((r) =>
      r.post === post._id || r.post?._id === post._id
    );
  
    if (reaction) {
      setMyReactionType(reaction.reaction_type);
    }
  }, [user, post]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-between hover:shadow-2xl transition duration-300 border border-gray-100 h-[250px]">
      <div className="flex items-start gap-4">
        <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
          <HiDocumentText className="text-2xl" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-1">{post.title}</h3>
          <p className="text-sm text-gray-500">
            {post.author.username} • {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <p className="text-gray-700 text-sm mt-4 line-clamp-3">
        {String(post.description).slice(0, 120)}...
      </p>

      <div className="w-full flex justify-between">
        <div
          ref={iconsDivRef}
          onClick={() => setShowReactions((prev) => !prev)}
          className="w-1/2 relative"
        >
          <button className="text-nowrap text-[14px] text-indigo-900 font-bold py-[1px] px-[2px]">
            Reaccionar
          </button>
          <Reactions onReact={handleReaction} showReactions={showReactions} myReactionType={myReactionType} />
        </div>

        <div className="w-1/2 flex justify-end items-end">
          <button
            onClick={() => setSelectedPost(post)}
            className="w-full text-end text-sm text-purple-600 hover:underline font-medium"
          >
            Leer más
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-3">
          <NewError message={error} />
        </div>
      )}
    </div>
  );
};
