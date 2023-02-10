const express = require('express');

const router = express.Router();
const readSpeakersData = require('../utils/fsUtils');

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

module.exports = router;