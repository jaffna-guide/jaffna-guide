import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const placeSchema = new Schema({
  body: String,
	name: {
		en: String,
		ta: String,
  },
  description: {
    en: String,
    ta: String,
  },
  score: { type: Number, default: 0 },
	latitude: Number,
  longitude: Number,
  active: { type: Boolean, default: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  marker: { type: String },
	createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

export default mongoose.model('Place', placeSchema);
