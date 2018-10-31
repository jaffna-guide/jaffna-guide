import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const placeSchema = new Schema({
	name: {
		en: String,
		ta: String,
	},
	latitude: Number,
	longitude: Number,
	createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: Date,
  updatedAt: Date,
});

export default mongoose.model('Place', placeSchema);
