import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  facebookId: String,
});

mongoose.model('users', userSchema);
