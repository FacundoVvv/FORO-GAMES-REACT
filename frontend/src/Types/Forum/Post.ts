type PostAuthor = {
  _id: string;
  username: string;
};

export type Reaction = {
  _id: string;
  user: string;
  type: "like" | "love" | "funny" | "sad" | "angry";
  reactedAt: string;
};

export type Post = {
  _id: string;
  title: string;
  description: string;
  author: PostAuthor;
  comments: string[];
  reactions: Reaction[];
  section: string;
  createdAt: string;
  updatedAt: string;
};

export type ReactionPayload = {
  post_id: string;
  reaction: Reaction;
};