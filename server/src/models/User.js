import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  jwt: String,
  facebookId: String,
  displayName: String,
});

export default mongoose.model('User', userSchema);
