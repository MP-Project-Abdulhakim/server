const express = require("express");
require("dotenv").config();


const db = require("./db/db");


const app = express();


app.use(express.json());







const userSchema = require("./routers/routs/user");
app.use(userSchema);










const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
