import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const markerSchema = new Schema({ default: { type: String }, active: { type: String }, orientation: { type: String } });
const imageSchema = new Schema({ thumbnail: { type: String }, original: { type: String }, credit: { type: String } });

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
	votes: { type: Number, default: 0 },
	latitude: Number,
	longitude: Number,
	active: { type: Boolean, default: true },
	category: { type: Schema.Types.ObjectId, ref: 'Category' },
	cover: { type: String },
	marker: markerSchema,
	images: [ imageSchema ],
	createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
	updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
	createdAt: { type: Date, default: Date.now },
	updatedAt: Date,
});

export default mongoose.model('Place', placeSchema);
