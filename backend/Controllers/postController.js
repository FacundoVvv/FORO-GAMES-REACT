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

      await Post.updateOne(
        { _id: post_id },
        { $pull: { reactions: { user: user_id } } }
      );
  
      await Post.updateOne(
        { _id: post_id },
        {
          $push: {
            reactions: {
              user: user_id,
              type: react_id,
              reactedAt: new Date(),
            },
          },
        }
      );
  
      await User.updateOne(
        { _id: user_id },
        {
          $pull: {
            "activity.reacted_posts": {
              post: post_id,
            },
          },
        }
      );
  
      await User.updateOne(
        { _id: user_id },
        {
          $push: {
            "activity.reacted_posts": {
              post: post_id,
              reaction_type: react_id,
              reactedAt: new Date(),
            },
          },
        }
      );
  
      return res.status(201).json({ message: "Reacción guardada con éxito." });
    } catch (error) {
      console.error("Error al reaccionar:", error);
      return res.status(500).json({ message: "Error al procesar la reacción." });
    }
  };
  