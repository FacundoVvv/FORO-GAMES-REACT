import { HiDocumentText } from "react-icons/hi";
import { Reactions } from "./Reactions/Reactions";
import { useState, useContext } from "react";
import { MyContext } from "@Contexts/Main_context";
import { Link } from "react-router-dom";
import { NewError } from "./NewError";

export const PostCard = ({ post, setSelectedPost, section }) => {
  const [error, setError] = useState("");
  const { user } = useContext(MyContext);

  return (
    <div
      className="items-center justify-center
                grid grid-cols-[25%,50%,25%] grid-rows-5 gap-2
                bg-white border border-gray-200 p-6 rounded-lg shadow-sm min-h-[450px]
                max-h-[450px] max-w-[340px]
                hover:border-purple-100 transition-all duration-200 ease-in-out
                drop-shadow-sm hover:shadow-md cursor-pointer"
    >
      <HiDocumentText className="text-[35px] text-indigo-800 col-start-1 col-end-2 row-start-1 row-end-2 self-center" />

      <Link
        className="text-left font-semibold text-sm text-indigo-900 col-start-2 col-end-3 row-start-1 row-end-2 self-center"
      >
        {user?.user?.username}
      </Link>

      <span className="text-left text-xs text-gray-500 col-start-3 col-end-4 row-start-1 row-end-2 self-center">
        {new Date(post?.createdAt).toLocaleDateString("es-ES")}
      </span>

      <div
        className="self-start bg-indigo-100 min-h-[35px] rounded-lg w-full col-start-1 col-end-4 row-start-2 row-end-3 
                flex items-center justify-center p-2"
      >
        <h2 className="text-center text-[15px] font-bold tracking-wider text-gray-900 break-words w-full">
          {post?.title}
        </h2>
      </div>

      <div className="col-start-1 col-end-4 row-start-3 row-end-4 w-full flex-col items-center justify-center h-full">
        <p className="line-clamp-3 text-[15px] text-gray-700 break-words h-auto">
          {post?.description}
        </p>
        {post?.description.length > 105 && (
          <button
            className="text-purple-600 text-sm mt-2 h-auto w-full text-left"
            onClick={() => setSelectedPost(post)}
          >
            Leer más
          </button>
        )}
      </div>

      <div className="col-start-1 col-end-4 row-start-4 row-end-5 gap-2 w-[100%] flex items-end justify-start pt-2">
        <Reactions post={post} section={section} setError={setError} />
      </div>

      <div className="col-start-3 col-end-4 row-start-5 row-end-6 flex gap-2 text-sm text-gray-600 w-[50%] flex items-center justify-center">
        <span>💬</span>
        <span>Comentarios</span>
      </div>

      {error && <NewError error={error} />}
    </div>
  );
};
