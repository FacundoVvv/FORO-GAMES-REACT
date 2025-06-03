import { React, useEffect, useState } from "react";
import {
  FaThumbsUp,
  FaHeart,
  FaLaugh,
  FaSadTear,
  FaAngry,
} from "react-icons/fa";
import { useIsMobile } from "@Hooks_forum/useIsMobile.js";

export const Reactions = ({ onReact, showReactions, myReactionType }) => {
  
  const reactions = [
    { id: "like", icon: FaThumbsUp, type: "Me gusta" },
    { id: "love", icon: FaHeart, type: "Me encanta" },
    { id: "funny", icon: FaLaugh, type: "Me divierte" },
    { id: "sad", icon: FaSadTear, type: "Me entristece" },
    { id: "angry", icon: FaAngry, type: "Me enoja" },
  ];
  const [hoveredIcon, setHoveredIcon] = useState("");
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!showReactions) {
      setHoveredIcon("");
    }
  }, [showReactions]);

  return (
    <>
      {showReactions && (
        <div
          onMouseLeave={() => setHoveredIcon(false)}
          className="flex w-[120px] h-[100%] text-nowrap items-center 
        justify-center cursor-pointer absolute top-[100%] left-[-15%]"
        >
          {reactions.map(({ id, type, icon: Icon}) => (
            <div key={id} className="flex w-[100%] items-center justify-center">
              <div className="w-[100%] h-[100%] relative">
                <Icon
                  data-id={id}
                  onClick={(e) => {
                    onReact?.(e.currentTarget.getAttribute("data-id"));
                  }}
                  onMouseEnter={(e) =>
                    setHoveredIcon(e.currentTarget.getAttribute("data-id"))
                  }
                  className={`cursor-pointer text-[22px] hover:text-[26px] ${
                    id === myReactionType ? "text-red-400" : "text-indigo-600"
                  }`}
                />
                {!isMobile && hoveredIcon === id && (
                  <span className="cursor-pointer w-[100%] text-[12px] absolute">
                    {reactions.find((r) => r.id === hoveredIcon)?.type}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
