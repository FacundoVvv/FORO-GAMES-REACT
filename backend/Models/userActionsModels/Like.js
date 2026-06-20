import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema ({
    
    // post info
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },

    //user info
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    reactionType: {
        type: String,
        enum: ['like', 'dislike', 'love', 'angry', 'funny'],
        required: true
      }
    
}, { timestamps: true } );

likeSchema.index({ author: 1, post: 1 }, { unique: true });

export const Like = mongoose.model('Like', likeSchema);