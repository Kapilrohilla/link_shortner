import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: String,

  email: {
    type: String,
    required: true,
    unique: true,
  },
  shorturls: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'urls',
    },
  ],
  hash: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

UserSchema.set('toJSON', {
  transform(doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.hash;
  },
});
