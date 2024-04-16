const { param, validationResult } = require("express-validator");

const errorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  next();
};

const putScoreValidator = [
  param("win", "Win is required.").not().isEmpty(),
  param("win", "Win must be an integer and greater or equal than 0.").isInt({
    min: 0,
  }),
  param("lose", "Lose is required.").not().isEmpty(),
  param("lose", "Lose must be an integer and greater or equal than 0.").isInt({
    min: 0,
  }),
  param("tie", "Tie is required.").not().isEmpty(),
  param("tie", "Tie must be an integer and greater or equal than 0.").isInt({
    min: 0,
  }),
];

module.exports = { errorMiddleware, putScoreValidator };
