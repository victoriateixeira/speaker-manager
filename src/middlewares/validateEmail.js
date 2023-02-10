const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const isValidEmail = /\\S+@\\S+/;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
    if (!isValidEmail.test(email)) {
      return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    return next();
  };
  
  module.exports = validateEmail;