import { Middleware } from '../Middleware/Middleware.js';
import { validateFields } from "../Middleware/validateFields.js";
import express from 'express';

import { createPost, getPosts, reactPost } from "../Controllers/postController.js";
const postRouter = express.Router();

//create post
postRouter.post('/create-post/:section', Middleware, validateFields, createPost);

//get posts
postRouter.get('/get-posts/:section', Middleware, getPosts);


//patch posts
//*reactions*
postRouter.patch('/react-post/:id', Middleware, reactPost);

export { postRouter };
