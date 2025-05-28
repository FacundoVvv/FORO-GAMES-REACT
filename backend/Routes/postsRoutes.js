import { Middleware } from '../Middleware/Middleware.js';
import { validateFields } from "../Middleware/validateFields.js";
import express from 'express';

import { createPost } from "../Controllers/postController.js";
import { getPosts } from '../Controllers/postController.js';
const postRouter = express.Router();

//create post
postRouter.post('/create-post/:section', Middleware, validateFields, createPost);

//get posts
postRouter.get('/get-posts/:section', Middleware, getPosts);
export { postRouter };
