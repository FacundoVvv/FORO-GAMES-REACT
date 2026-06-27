import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSocket } from "@Contexts/Socket_context";
import { PostCard } from "@Utils_forum_components/PostCard";
import { getPosts } from "@Utils/api/Posts";
import { ModalCard } from "@Utils_forum_components/ModalCard";
import { Post, ReactionPayload } from "@Types/Forum/Post";
import toast from "react-hot-toast";

export const Announces = () => {
  const section = "announce";
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [arrayPosts, setArrPosts] = useState<Post[]>([]);
  const { socket, isSocketReady } = useSocket();

  const closeModal = () => {
    setSelectedPost(null);
  };

  //first load get posts
  useEffect(() => {
    const callPosts = async () => {
      try {
        const posts = await getPosts(section);
        if (posts) {
          setArrPosts(posts);
        } else {
          toast.error("Hubo un problema al cargar los posts.");
        }
      } catch (error) {
        toast.error("Hubo un problema al cargar los posts.");
      } finally {
        setLoading(false);
      }
    };
    callPosts();
  }, []);

  //wait sockets to update and set new reactions on array
  useEffect(() => {
    if (socket.current && isSocketReady) {
      socket.current.emit("joinRoom", section);

      const handleReaction = ({ post_id, reaction }: ReactionPayload) => {
        setArrPosts((prev) =>
          prev.map((post) => {
            if (post._id !== post_id) return post;

            const existing = post.reactions.find(
              (r) => r.user === reaction.user
            );

            if (existing && existing.type === reaction.type) {
              return {
                ...post,
                reactions: post.reactions.filter(
                  (r) => r.user !== reaction.user
                ),
              };
            }

            const filtered = post.reactions.filter(
              (r) => r.user !== reaction.user
            );
            return {
              ...post,
              reactions: [...filtered, reaction],
            };
          })
        );
      };
      socket.current.on("receive_reaction", handleReaction);

      return () => {
        socket.current!.off("receive_reaction", handleReaction);
        socket.current!.emit("leaveRoom", section);
      };
    }
  }, [isSocketReady]);

  return (
    isSocketReady && (
      <div className="max-w-5xl mx-auto px-4 py-10 relative">
        <h2 className="text-[28px] font-extrabold mb-10 text-gray-800 text-center">
          Últimas <span className="text-purple-600">noticias</span>
        </h2>

        <div className="mb-6 text-right lg:w-full sm:w-[96%]">
          <Link
            to="/forum/create_post/announce"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition"
          >
            Crear post
          </Link>
        </div>

        <div
          className="flex flex-col items-center justify-center
                md:grid md:grid-cols-2 md:w-[80%] md:mx-auto 
                lg:grid-cols-3 lg:w-full 
                gap-6 w-full"
        >
          {loading ? (
            <h2 className="col-span-full text-center text-gray-500">
              Cargando posts...
            </h2>
          ) : Array.isArray(arrayPosts) && arrayPosts.length > 0 ? (
            arrayPosts
              .slice()
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((post) => (
                <PostCard
                  post={post}
                  key={post._id}
                  setSelectedPost={setSelectedPost}
                  section={section}
                />
              ))
          ) : (
            <h2 className="col-span-full text-center text-gray-500">
              No hay posts disponibles.
            </h2>
          )}
        </div>

        {selectedPost && (
          <ModalCard closeModal={closeModal} selectedPost={selectedPost} />
        )}
      </div>
    )
  );
};