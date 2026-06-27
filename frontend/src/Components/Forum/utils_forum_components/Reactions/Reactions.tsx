import { useState } from "react";
import { FaThumbsUp, FaHeart, FaLaugh, FaSadTear, FaAngry } from "react-icons/fa";
import { useIsMobile } from "@Hooks/useIsMobile";
import { useAuth } from "@Contexts/Auth_context";
import { useSocket } from "@Contexts/Socket_context";
import { Post } from "@Types/Forum/Post";
import { reactPost } from "@Utils/api/Posts";

type ReactionItem = {
  id: "like" | "love" | "funny" | "sad" | "angry";
  icon: React.ElementType;
  type: string;
};

type ReactionsProps = {
  post: Post;
  section: string;
  setError: (msg: string) => void;
};

const reactionsList: ReactionItem[] = [
  { id: "like", icon: FaThumbsUp, type: "Me gusta" },
  { id: "love", icon: FaHeart, type: "Me encanta" },
  { id: "funny", icon: FaLaugh, type: "Me divierte" },
  { id: "sad", icon: FaSadTear, type: "Me entristece" },
  { id: "angry", icon: FaAngry, type: "Me enoja" },
];

export const Reactions = ({ post, section, setError }: ReactionsProps) => {
  const { user } = useAuth();
  const { socket, isSocketReady } = useSocket();
  const isMobile = useIsMobile();

  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [myReactionType, setMyReactionType] = useState<string | null>(
    post.reactions?.find((r) => r.user === user?.user?._id)?.type || null
  );

  const handleClick = async (reactionId: ReactionItem["id"]) => {
    setError("");

    if (!user.isLogged || !user.user) {
      setError("Debes iniciar sesión para reaccionar.");
      return;
    }

    const result = await reactPost(post._id, reactionId, user.user._id);

    if (!result.ok) {
      if (result.status === 400) {
        setError(result.message || "Datos inválidos.");
      } else if (result.status === 401) {
        setError("No autorizado. Inicia sesión nuevamente.");
      } else if (result.status === 500) {
        setError("Error del servidor. Intenta más tarde.");
      } else {
        setError("Ocurrió un error inesperado.");
      }
      return;
    }

    setMyReactionType(reactionId === myReactionType ? null : reactionId);

    if (socket?.current && isSocketReady) {
      socket.current.emit("newReaction", {
        section,
        post_id: post._id,
        reaction: {
          type: reactionId,
          user: user.user._id,
        },
      });
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

        const bgColor = isActive ? "bg-red-100" : isHovered ? "bg-indigo-100" : "bg-transparent";
        const textColor = isActive ? "text-red-500" : isHovered ? "text-purple-700" : "text-indigo-700";

        return (
          <div
            key={id}
            className="relative flex items-center justify-center rounded-full transition-all duration-200 ease-in-out"
          >
            <Icon
              data-id={id}
              onClick={() => handleClick(id)}
              onMouseEnter={(e: React.MouseEvent<SVGElement>) =>
                setHoveredIcon(e.currentTarget.getAttribute("data-id"))
              }
              className={`cursor-pointer text-lg md:text-xl transition-transform duration-200 ease-in-out
                ${textColor} ${bgColor} rounded-full hover:scale-[1.15]`}
            />
            <span className="text-sm p-2">
              {post?.reactions?.filter((r) => r.type === id).length || 0}
            </span>
            {!isMobile && isHovered && (
              <span className="absolute bottom-[calc(100%+2px)] text-xs text-white text-center bg-purple-500 rounded px-1.5 py-[1px] shadow-sm z-10 whitespace-nowrap">
                {type}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};