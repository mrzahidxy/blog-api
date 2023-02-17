const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRouter = require("./Routes/auth");
const blogRouter = require("./Routes/blog");

dotenv.config();

const app = express();

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB is connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

//ROUTING
app.use("/api/auth", authRouter);
app.use("/api/blogs", blogRouter)

app.listen(5000, () => {
  console.log("BACKEND IS RUNNING");
});
