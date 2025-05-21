import { User } from '../Models/User.js';
import { Post } from '../Models/userActionsModels/Post.js';

export const createPost = async (req, res) => {
    const section = req.params.section;
    const { title, content, author } = req.body;

    try{
        const newPost = new Post({
            title,
            description:content,
            author,
            section,
            createdAt: new Date()
        });

        await newPost.save();
        res.status(200).json({ message: 'Post creado', post: newPost });

    }catch(error){
        return res.status(500).json({ message:"error 500: " + error });
    }
}
