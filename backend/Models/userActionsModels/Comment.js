import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        minlength: 1,
        maxlength: 150,
        required: true
    },
    //user info
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    // post info
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }
}, { timestamps: true } );

export const Comment = mongoose.model('Comment', commentSchema);
