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
  token: {
    type: String,
    default: null,
  },
  times: {
    lastResendCodeEmailV: { type: Date, default: null }, // to verify last email resend code
  },
  roles: {
    type: Map, 
    of: Boolean,
    default: { default_user: true }, 
  },
}, { timestamps: true }); // created at - updated at

export const User = mongoose.model('User', userSchema);
