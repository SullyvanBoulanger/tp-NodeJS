require("dotenv").config();
require("./src/config/database");
const express = require("express");
const rockPaperScissorsRouter = require("./src/router/rock-paper-scissor-router");
const app = express();
const port = parseInt(process.env.PORT) ?? 3000;

app.use(express.json());
app.use(rockPaperScissorsRouter);

app.listen(port, () => {
  console.log("App listening");
});
