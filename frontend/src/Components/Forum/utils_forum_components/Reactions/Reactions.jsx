import { useEffect, useState, useContext } from "react";
import {
  FaThumbsUp,
  FaHeart,
  FaLaugh,
  FaSadTear,
  FaAngry,
} from "react-icons/fa";
import { useIsMobile } from "@Hooks_forum/useIsMobile.js";
import { MyContext } from "@Contexts/Main_context";

export const Reactions = ({ post, section, setError }) => {
  const { socket, isSocketReady, user } = useContext(MyContext);
  const isMobile = useIsMobile();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [myReactionType, setMyReactionType] = useState(
    post.reactions?.find((r) => r.user === user?.user?._id)?.type || ""
  );

  const reactionsList = [
    { id: "like", icon: FaThumbsUp, type: "Me gusta" },
    { id: "love", icon: FaHeart, type: "Me encanta" },
    { id: "funny", icon: FaLaugh, type: "Me divierte" },
    { id: "sad", icon: FaSadTear, type: "Me entristece" },
    { id: "angry", icon: FaAngry, type: "Me enoja" },
  ];

  const handleClick = async (reaction_id) => {
    setError?.("");

    if (!user.isLogged) {
      setError?.("Debes iniciar sesión para reaccionar.");
      return;
    }

    const user_id = user.user._id;

    try {
      const response = await fetch(
        `${BACKEND_URL}/forum/posts/react-post/${post._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ react_id: reaction_id, user_id }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        if (response.status === 400) {
          setError?.(data?.message || "Datos inválidos.");
        } else if (response.status === 401) {
          setError?.("No autorizado. Inicia sesión nuevamente.");
        } else if (response.status === 500) {
          setError?.("Error del servidor. Intenta más tarde.");
        } else {
          setError?.("Ocurrió un error inesperado.");
        }

        return;
      }

      if (reaction_id === myReactionType) {
        setMyReactionType(null);
      } else {
        setMyReactionType(reaction_id);
      }

      if (socket?.current && isSocketReady) {
        socket.current.emit("newReaction", {
          section: section,
          post_id: post._id,
          reaction: {
            type: reaction_id,
            user: user.user._id,
          },
        });
      }
    } catch (e) {
      console.error("Error en la solicitud:", e);
      setError?.("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div
      onMouseLeave={() => setHoveredIcon(null)}
      className="flex gap-[2px] items-center justify-center w-fit h-fit"
    >
      {reactionsList.map(({ id, icon: Icon, type }) => {
        const isHovered = hoveredIcon === id;
        const isActive = myReactionType === id;

        const bgColor = isActive
          ? "bg-red-100"
          : isHovered
          ? "bg-indigo-100"
          : "bg-transparent";

        const textColor = isActive
          ? "text-red-500"
          : isHovered
          ? "text-purple-700"
          : "text-indigo-700";

        return (
          <div
            key={id}
            className="relative flex items-center justify-center rounded-full transition-all duration-200 ease-in-out"
          >
            <Icon
              data-id={id}
              onClick={() => handleClick(id)}
              onMouseEnter={(e) =>
                setHoveredIcon(e.currentTarget.getAttribute("data-id"))
              }
              className={`cursor-pointer text-[18px] md:text-[20px] transition-transform duration-200 ease-in-out
                ${textColor} ${bgColor} rounded-full hover:scale-[1.15]`}
            />
            <span className="text-sm p-2">
              {post?.reactions?.filter((r) => r.type === id).length || 0}
            </span>
            {!isMobile && isHovered && (
              <span className="absolute bottom-[calc(100%+2px)] text-[10px] text-white text-center bg-purple-500 rounded px-1.5 py-[1px] shadow-sm z-10 whitespace-nowrap">
                {type}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
