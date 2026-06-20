import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationToken: {
    type: String,
    default: null,
  },
  times: {
    lastResendCodeEmailV: { type: Date, default: null }, // to verify last email resend code
    expiresCode: { type: Date, default: null } //verify pin email confirm code expiration
  },
  roles: {
    type: Map, 
    of: Boolean,
    default: { default_user: true }, 
  },
  activity: {
    reacted_posts: [
      {
        post: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
          required: true
        },
        reaction_type: {
          type: String,
          enum: ["like", "love", "funny", "sad", "angry"],
          required: true
        },
        reacted_at: {
          type: Date,
          default: Date.now
        }
      }
    ]
  }
}, { timestamps: true }); // created at - updated at

export const User = mongoose.model('User', userSchema);
