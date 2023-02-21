const moongose = require("mongoose");

const blogSchema = new moongose.Schema(
  {
    userId: {type: String, required: true},
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = moongose.model("Blog", blogSchema);
