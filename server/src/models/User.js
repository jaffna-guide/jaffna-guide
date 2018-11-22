import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
	jwt: String,
	facebookId: String,
	displayName: String,
	roles: [ String ], // "traveller", "admin", "superadmin"
	votes: {
		culture: { type: Number, default: 10 },
		restaurants: { type: Number, default: 10 },
		hotels: { type: Number, default: 10 },
		education: { type: Number, default: 10 },
	},
});

export default mongoose.model('User', userSchema);
