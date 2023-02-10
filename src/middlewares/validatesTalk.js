const validatesTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
return next();
};

const validatesWatchedAtDate = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const isDateValid = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/;
  if (!isDateValid.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  return next();
};

const validatesRating = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (!rate) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (rate < 1 || rate > 5 || Number.isInteger(rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  return next();
};

module.exports = { validatesTalk, validatesWatchedAtDate, validatesRating };