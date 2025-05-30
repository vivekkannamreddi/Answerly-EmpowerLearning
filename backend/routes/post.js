const express = require('express');
const Post = require('../models/PostsModel.js');
const verifyToken = require('../middleware.js');
const User = require('../models/UserModel.js');
const Answer = require('../models/AnswerModel.js')
const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Save new post
    const newPost = new Post({ ...req.body, postedBy: userId });
    const savedPost = await newPost.save();

    // Fetch user to calculate streak
    const user = await User.findById(userId);
    const today = new Date();
    const lastPostDate = user.lastPostDate ? new Date(user.lastPostDate) : null;

    let newStreak = 1;

    if (lastPostDate) {
      const diffInTime = today.setHours(0, 0, 0, 0) - lastPostDate.setHours(0, 0, 0, 0);
      const diffInDays = diffInTime / (1000 * 60 * 60 * 24);

      if (diffInDays === 0) {
        newStreak = user.streak; // already posted today
      } else if (diffInDays === 1) {
        newStreak = user.streak + 1; // continue streak
      } else {
        newStreak = 1; // reset streak
      }
    }

    // Update user
    await User.findByIdAndUpdate(userId, {
      $set: {
        lastPostDate: new Date(),
        streak: newStreak,
      },
      $inc: { postCount: 1 }
    });

    res.status(201).json(savedPost);
  } catch (err) {
    console.error('Backend error:', err);
    res.status(400).json({ error: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate('postedBy', 'username')
      .lean(); 
    // const setpostcount = await User.findByIdAndUpdate(posts.postedBy._id);

    const postsWithAnswerCount = await Promise.all(posts.map(async (post) => {
      const answerCount = await Answer.countDocuments({ post: post._id });
      return { ...post, answerCount };
    }));

    res.status(200).json(postsWithAnswerCount);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('postedBy', 'username');
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const answers = await Answer.find({ post: post._id }).populate('answeredBy', 'username');

    res.json({ post, answers }); // send both post and its answers
  } catch (err) {
    console.error('Error fetching post:', err);
    res.status(500).json({ message: 'Server error' });
  }
});



router.post('/:id/answer', async (req, res) => {
  try {
    
    const postId = req.params.id;
    const { content, userId } = req.body; 
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const answer = new Answer({
      content,
      post: postId,
      answeredBy: userId,
    });

    await answer.save();

    res.status(201).json({ message: 'Answer submitted successfully', answer });
  } catch (err) {
    console.error('Error saving answer:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.delete('/:postId', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // 🔐 Check if the post belongs to the logged-in user
    if (post.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await post.deleteOne();

    await User.findByIdAndUpdate(req.user.id, { $inc: { postCount: -1 } });

      
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({     message: 'Server error while deleting post' });
  }
});


router.post('/byIds',async(req,res)=>{
  try {
    const { postIds } = req.body;

    if (!Array.isArray(postIds) || postIds.length === 0) {
      return res.status(400).json({ message: 'Invalid or missing postIds array' });
    }

    const posts = await Post.find({ _id: { $in: postIds } })
      .populate('postedBy', 'username')
      .lean(); 

    const postsWithAnswerCount = await Promise.all(posts.map(async (post) => {
      const answerCount = await Answer.countDocuments({ post: post._id });
      return { ...post, answerCount };
    }));
    res.status(200).json({posts:postsWithAnswerCount });
  } catch (error) {
    console.error('Error fetching posts by IDs:', error);
    res.status(500).json({ message: 'Server error while fetching posts by IDs' });
  }
})


module.exports = router;

