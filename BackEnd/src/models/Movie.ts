import { Schema, model } from 'mongoose';

const movieSchema = new Schema({
  title: { type: String, required: true },
  year: { type: String, required: true },
  rating: { type: String, required: true }
});

export default model('Movie', movieSchema);