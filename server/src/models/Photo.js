import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const photoSchema = new Schema({
  thumbnailUrl: { type: String },
  originalUrl: { type: String },
  watermarkedUrl: { type: String },
  approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  loves: [ { type: Schema.Types.ObjectId, ref: 'Love' } ],
});

export default mongoose.model('Photo', photoSchema);
