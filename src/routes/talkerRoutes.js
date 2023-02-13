const express = require('express');
const validatesAge = require('../middlewares/validatesAge');
const validatesName = require('../middlewares/validatesName');
const { validatesRating, 
  validatesWatchedAtDate, 
  validatesTalk } = require('../middlewares/validatesTalk');
const validatesToken = require('../middlewares/validatesToken');
const { readSpeakersData,
   registerNewSpeaker, 
   editSpeaker, 
   removeSpeaker, 
   getSpeakerByName } = require('../utils/fsUtils');

   const HTTP_OK_STATUS = 200;

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const speakers = await readSpeakersData();
    if (speakers.length > 0) {
      return res.status(HTTP_OK_STATUS).json(speakers);
    } 
    return res.status(HTTP_OK_STATUS).json([]);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get('/search/', validatesToken, async (req, res) => {
  const { q } = req.query;
  try {
    if (!q) {
          const speakers = await readSpeakersData();
            return res.status(HTTP_OK_STATUS).json(speakers);
    }
    const filteredSpeakers = await getSpeakerByName(q);
    return res.status(HTTP_OK_STATUS).json(filteredSpeakers);
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
      return res.status(HTTP_OK_STATUS).json(selectedSpeaker);
    }
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.post('/', 
validatesToken,
validatesName,
 validatesAge, 
 validatesTalk, 
 validatesWatchedAtDate, 
 validatesRating, async (req, res) => {
try {
    const newSpeaker = req.body;
    const newRegisteredSpeaker = await registerNewSpeaker(newSpeaker);
    return res.status(201).json(newRegisteredSpeaker);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.put('/:id', 
validatesToken,
validatesName,
 validatesAge, 
 validatesTalk, 
 validatesWatchedAtDate, 
 validatesRating, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSpeaker = req.body;
    const newUpdatedSpeaker = await editSpeaker(id, updatedSpeaker);
    return res.status(HTTP_OK_STATUS).json(newUpdatedSpeaker);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.delete('/:id', validatesToken, async (req, res) => {
  try {
    const { id } = req.params;
    await removeSpeaker(id);
    return res.status(204).end();
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;