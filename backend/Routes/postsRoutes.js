import { Middleware } from '../Middleware/Middleware.js';
import { validateFields } from "../Middleware/validateFields.js";
import express from 'express';

import { createPost } from "../Controllers/postController.js";

const postRouter = express.Router();

//create post
postRouter.post('/create-post/:section', Middleware, validateFields, createPost);

export { postRouter };
