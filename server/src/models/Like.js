import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const likeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  likedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Like', likeSchema);
