import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const placeSchema = new Schema({
  body: String,
	name: {
		en: String,
		ta: String,
  },
  score: Number,
	latitude: Number,
  longitude: Number,
	category: { type: Schema.Types.ObjectId, ref: 'Category' },
	createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: Date,
  updatedAt: Date,
});

export default mongoose.model('Place', placeSchema);
