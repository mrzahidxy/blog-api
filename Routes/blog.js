const Blog = require("../models/Blog");
const router = require("express").Router();

//? BLOG POSTTT
router.post("/", async (req, res) => {
  const newBlog = new Blog({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
  });

  try {
    const savedBlog = await newBlog.save();
    res.status(200).json({
      message: "Blog successfully post!",
      data: savedBlog,
    });
  } catch (error) {
    console.log(error);
  }
});

//? BLOG GETTT

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
