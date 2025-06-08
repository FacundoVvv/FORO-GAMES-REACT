import { User } from "../Models/User.js";
import { Post } from "../Models/userActionsModels/Post.js";

export const createPost = async (req, res) => {
  const section = req.params.section;
  const { title, content, author } = req.body;

  try {
    const newPost = new Post({
      title,
      description: content,
      author,
      section,
      createdAt: new Date(),
    });

    await newPost.save();
    res.status(201).json({ message: "Post creado", post: newPost });
  } catch (error) {
    return res.status(500).json({ message: "error 500: " + error });
  }
};

//get posts
export const getPosts = async (req, res) => {
  const section = req.params.section;

  try {
    const posts = await Post.find({ section }).populate("author", "username");
    res.status(201).json({ message: "exito.", posts });
  } catch (error) {
    return res.status(500).json({ message: "error 500: " + error });
  }
};

export const reactPost = async (req, res) => {
  const post_id = req.params.id;
  const { react_id, user_id } = req.body;

  if (!post_id || !react_id || !user_id) {
    return res.status(400).json({ message: "Datos incompletos." });
  }

  try {
    const post = await Post.findById(post_id);
    const user = await User.findById(user_id);

    if (!post || !user) {
      return res.status(404).json({ message: "Datos no encontrados." });
    }

    // check reaction
    const existingReaction = post.reactions.find(
      (e) => e.user.toString() === user_id && e.type === react_id
    );

    if (existingReaction) {
      try {
        // delete post prev reaction
        post.reactions = post.reactions.filter(
          (e) => !(e.user.toString() === user_id && e.type === react_id)
        );

        // delete user prev reaction
        user.activity.reacted_posts = user.activity.reacted_posts.filter(
          (r) => r.post.toString() !== post._id.toString()
        );

        await post.save();
        await user.save();

        return res
        .status(200)
        .json({ message: "La reacción ha sido eliminada."});

      } catch (e) {
        return res
          .status(500)
          .json({ message: "Ocurrió un problema al quitar la reacción." });
      }
    } else {
      try {
        //delete post prev reactions
        post.reactions = post.reactions.filter(
          (e) => e.user.toString() !== user_id
        );

        //user prev delete
        user.activity.reacted_posts = user.activity.reacted_posts.filter(
          (r) => r.post.toString() !== post_id
        );
        
        // add
        post?.reactions?.push({
          user: user_id,
          type: react_id,
          reactedAt: new Date(),
        });

        // add
        user?.activity?.reacted_posts?.push({
          post: post_id,
          reaction_type: react_id,
          reacted_at: new Date(),
        });

        await post.save();
        await user.save();

        return res
          .status(200)
          .json({ message: "La reacción ha sido añadida." });
      } catch (e) {
        return res
          .status(500)
          .json({ message: "Ocurrió un problema al colocar la reacción." });
      }
    }
  } catch (error) {
    console.error("Error al reaccionar:", error);
    return res.status(500).json({ message: "Error al procesar la reacción." });
  }
};