const express = require("express");
const controller = require("../controller/rock-paper-scissor-controller");
const {
  errorMiddleware,
  putScoreValidator,
} = require("../validator/rock-paper-scissor-validator");

const router = express.Router();

router.get("/game/play/rock", controller.playRock);
router.get("/game/play/paper", controller.playPaper);
router.get("/game/play/scissors", controller.playScissors);

router.get("/game/score", controller.getScore);
router.get("/game/scores", controller.getAllScores);

router.post("/game/restart", controller.restartGame);

router.put("/game/score/:win/:lose/:tie", [putScoreValidator, errorMiddleware], controller.cheatScore);

module.exports = router;
