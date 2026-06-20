import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25,
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 800,
    },
    //user info
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    reactions: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        type: { type: String, enum: ['like', 'love', 'funny', 'sad', 'angry'], required: true },
        reactedAt: { type: Date, default: Date.now }
    }
    ],
    section:{type:String},
}, { timestamps: true } );

export const Post = mongoose.model('Post', postSchema);