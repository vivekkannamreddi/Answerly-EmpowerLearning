const express = require('express');
const Post = require('../models/PostsModel.js');
const verifyToken = require('../middleware.js');
const Answer = require('../models/AnswerModel.js')
const router = express.Router();



router.delete('/:answerId', verifyToken, async (req, res) => {
  try {
    
    const answer = await Answer.findById(req.params.answerId);
    if (!answer) return res.status(404).json({ message: 'Answer not found' });
    await answer.deleteOne();
    res.status(200).json({ message: 'Answer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting answer' });
  }
});

router.get('/',async(req,res)=>{
  try{
    const allAnswers = await Answer.find({});
    if(!allAnswers) return res.status(400).json({message : 'Answers not found..'});
    res.status(200).json({allAnswers})
  }catch(error){
    res.status(500).json({message:"server error while fetching answers"})

  }
})
router.put('/:answerId', verifyToken, async (req, res) => {
  const { answerId } = req.params;
  const { content } = req.body;
  const userId = req.user.id; 

  if (!content || content.trim() === '') {
    return res.status(400).json({ message: 'Content cannot be empty.' });
  }

  try {
  
    const answer = await Answer.findById(answerId);
    if (!answer) {
      return res.status(404).json({ message: 'Answer not found.' });
    }

    if (answer.answeredBy.toString() !== userId) {
      return res.status(403).json({ message: 'You are not authorized to update this answer.' });
    }

    answer.content = content;
    await answer.save();

    res.json({ message: 'Answer updated successfully.', answer });
  } catch (error) {
    console.error('Error updating answer:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;