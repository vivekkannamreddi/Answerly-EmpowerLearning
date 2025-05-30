const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  difficulty:  { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  subject:     { type: String, required: true },
  topic:       { type: String, required: true },
  postedBy:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
  createdAt:   { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
