const fs = require('fs').promises;
const path = require('path');

async function readSpeakersData() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, '../talker.json'));
    const speakers = JSON.parse(data);
    return speakers;
  } catch (error) {
    console.error(`Erro na leitura do arquivo: ${error.message}`);
  }
}

async function registerNewSpeaker(newSpeaker) {
    const data = await fs.readFile(path.resolve(__dirname, '../talker.json'));
    const nextId = (data[(data.length - 1)].id + 1);
    const speakers = JSON.parse(data);
    const newSpeakerWId = [nextId, ...newSpeaker];
    const updatedSpeakersList = speakers.push(newSpeakerWId); (
    await fs.writeFile(path.resolve(__dirname, '../talker.json'),
     JSON.stringify(updatedSpeakersList)));
     return newSpeakerWId;
}

module.exports = { readSpeakersData, registerNewSpeaker };