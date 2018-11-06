import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  jwt: String,
  facebookId: String,
  displayName: String,
  roles: [String], // "traveller", "admin", "superadmin"
});

export default mongoose.model('User', userSchema);
