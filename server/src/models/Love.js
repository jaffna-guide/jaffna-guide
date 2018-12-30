import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const loveSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  lovedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Love', loveSchema);
