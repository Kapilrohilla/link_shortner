import mongoose from 'mongoose';

export const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
    unique: true,
  },
  shortId: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
});

urlSchema.set('toJSON', {
  transform(_doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});
