const express = require('express');
const verifyToken = require('../middleware.js');
const User = require('../models/UserModel.js');
const router = express.Router();





router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      streak: user.streak,
      posts: user.postCount,
      createdAt: user.createdAt,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


router.put('/edit', verifyToken, async (req, res) => {
  try {
    const { username, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { username, email },
      { new: true } // return updated document
    );

    res.json({ success: "Updated data successfully.", updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error." });
  }
});

router.delete('/:id',async (req,res)=>{
  const {id} = req.params;
  const deletedACC = await User.findByIdAndDelete(id)
  res.json({success:"user deleted ... " ,deletedACC})
})


module.exports = router