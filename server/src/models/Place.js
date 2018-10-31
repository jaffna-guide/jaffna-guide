import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const placeSchema = new Schema({
  name: String,
});

export default mongoose.model('Place', placeSchema);
