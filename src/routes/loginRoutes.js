const express = require('express');
const generateToken = require('../utils/generateToken');
// const validateEmail = require('../middlewares/validateEmail');
// const validatePassword = require('../middlewares/validatePassword');

const router = express.Router();

router.post('/', (req, res) => {
  try {
    const token = generateToken();
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;