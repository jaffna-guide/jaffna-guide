import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  body: String,
  rank: Number,
  name: {
    en: String,
    ta: String,
  },
  description: {
    en: String,
    ta: String,
  },
  backgroundImage: String,
});

export default mongoose.model('Category', categorySchema);
