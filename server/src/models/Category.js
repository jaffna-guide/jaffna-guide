import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const categorySchema = new Schema({
	body: String,
	rank: Number,
	active: { type: Boolean, default: true },
	name: {
		en: String,
		ta: String,
	},
	description: {
		en: String,
		ta: String,
	},
});

export default mongoose.model('Category', categorySchema);
