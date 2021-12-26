const express = require("express");
require("dotenv").config();

const db = require("./db/db");

const app = express();

app.use(express.json());







const roleRouter = require("./routers/routs/role");
app.use( roleRouter);

const userSchema = require("./routers/routs/user");
app.use(userSchema);

const postRouter = require("./routers/routs/posts");
app.use(postRouter);

const commentRouter = require("./routers/routs/comment");
app.use(commentRouter);

const likeRouter = require("./routers/routs/like");
app.use(likeRouter);







const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
