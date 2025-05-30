const express = require("express");
const auth = require("./routes/auth");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const posts = require("./routes/post");
const answer = require("./routes/answer");
const user = require('./routes/user.js')

dotenv.config();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/auth", auth);
app.use("/auth/posts", posts);
app.use("/auth/answers", answer);
app.use("/auth/user",user)



app.get("/", (req, res) => {
  res.send("working");
});

const dbconnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    app.listen(port, () => {
      console.log(`Server is listening at port ${port}...`);
    });

  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
};

dbconnection();
