import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const markerSchema = new Schema({ default: { type: String }, active: { type: String }, orientation: { type: String } });

const placeSchema = new Schema({
	body: { type: String, unique: true },
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
	active: { type: Boolean, default: false },
	category: { type: Schema.Types.ObjectId, ref: 'Category' },
	cover: { type: String },
	logo: { type: String },
	marker: markerSchema,
	photos: [ { type: Schema.Types.ObjectId, ref: 'Photo' } ],
	createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
	updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
	createdAt: { type: Date, default: Date.now },
	updatedAt: Date,
});

export default mongoose.model('Place', placeSchema);
