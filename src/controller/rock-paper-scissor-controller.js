const Score = require("../model/score");

const controller = {};

const ROCK = "pierre";
const PAPER = "feuille";
const SCISSORS = "ciseaux";
const ACTION_ENUM = [ROCK, PAPER, SCISSORS];

const serverPlayGame = () => {
  const randomNumber = Math.floor(Math.random() * 3);
  return ACTION_ENUM[randomNumber];
};

const checkScore = (userAction, serverAction) => {
  if (userAction === serverAction) return 0;
  switch (userAction) {
    case ROCK:
      return serverAction === SCISSORS ? 1 : -1;
    case PAPER:
      return serverAction === ROCK ? 1 : -1;
    case SCISSORS:
      return serverAction === PAPER ? 1 : -1;
    default:
      throw new Error("Not scoreable");
  }
};

const getLastScore = async () => {
  let score = await Score.findOne({ order: [["id", "DESC"]] });
  if (score === null) score = await Score.create();

  return score;
};

const registerScore = async (newScore) => {
  const score = await getLastScore();

  score.set({
    win: newScore === 1 ? score.win + 1 : score.win,
    lose: newScore === -1 ? score.lose + 1 : score.lose,
    tie: newScore === 0 ? score.tie + 1 : score.tie,
  });

  await score.save();
};

const playGame = async (userAction) => {
  const serverAction = serverPlayGame();
  const score = checkScore(userAction, serverAction);
  await registerScore(score);
  const gameResult =
    score === -1 ? "perdu" : score === 1 ? "gagné" : "une égalité";

  return `Vous avez joué ${userAction}, le serveur a joué ${serverAction}, vous avez fait ${gameResult}`;
};

controller.playRock = async (req, res) => res.send(await playGame(ROCK));
controller.playPaper = async (req, res) => res.send(await playGame(PAPER));
controller.playScissors = async (req, res) =>
  res.send(await playGame(SCISSORS));

controller.getScore = async (req, res) => {
  const score = await getLastScore();
  const { id, ...restScore } = score.dataValues;
  res.json(restScore);
};
controller.getAllScores = async (req, res) => res.json(await Score.findAll());

controller.restartGame = async (req, res) => {
  const newScore = await Score.create();
  const { id, ...restScore } = newScore.dataValues;
  res.json(restScore);
};

controller.cheatScore = async (req, res) => {
  const score = await getLastScore();
  score.set({
    win: req.params.win,
    lose: req.params.lose,
    tie: req.params.tie,
  });
  await score.save();
  const { id, ...restScore } = score.dataValues;
  res.json(restScore);
};

module.exports = controller;
