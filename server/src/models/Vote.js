import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const voteSchema = new Schema({
	place: { type: Schema.Types.ObjectId, ref: 'Vote' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
	votes: { type: Number },
  votedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Vote', voteSchema);
