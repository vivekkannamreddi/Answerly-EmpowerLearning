const mongoose =require('mongoose');

const answerSchema = new mongoose.Schema({
  content:   { type: String, required: true },
  post:      { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  answeredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports=mongoose.model('Answer', answerSchema);
