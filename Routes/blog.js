
const Blog = require("../models/Blog");
const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");
const router = require("express").Router();

//? BLOG POSTTT
router.post("/", verifyToken, async (req, res) => {
  console.log(req.user.id);
  const newBlog = new Blog({
    userId: req.user.id,
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
    res.status(500).json(error);
  }
});

//? BLOGS GETTT
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json(error);
  }
});

//? SINGLE BLOG GETTT
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json(error);
  }
});

//? UPDATEEE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Blog.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json("Blog updated!");
  } catch (error) {
    res.status(500).json(error);
  }
});

//? DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json("Blog deleted!");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
