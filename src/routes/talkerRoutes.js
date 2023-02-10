const express = require('express');
const validatesAge = require('../middlewares/validatesAge');
const validatesName = require('../middlewares/validatesName');
const { validatesRating, 
  validatesWatchedAtDate, 
  validatesTalk } = require('../middlewares/validatesTalk');
const validatesToken = require('../middlewares/validatesToken');
const { readSpeakersData, registerNewSpeaker } = require('../utils/fsUtils');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const speakers = await readSpeakersData();
    if (speakers.length > 0) {
      return res.status(200).json(speakers);
    } 
    return res.status(200).json([]);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const speakers = await readSpeakersData();
    const selectedSpeaker = speakers.find((speaker) => speaker.id === Number(id));
    if (selectedSpeaker) {
      return res.status(200).json(selectedSpeaker);
    }
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.post('/', 
validatesName,
 validatesAge, 
 validatesTalk, 
 validatesWatchedAtDate, 
 validatesRating, validatesToken, async (req, res) => {
try {
    const newSpeaker = req.body;
    const newRegisteredSpeaker = await registerNewSpeaker(newSpeaker);
    return res.status(201).json(newRegisteredSpeaker);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;