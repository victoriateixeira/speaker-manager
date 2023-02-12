const fs = require('fs').promises;
const path = require('path');

const PATH_TALKER = '../talker.json';

async function readSpeakersData() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, PATH_TALKER));
    const speakers = JSON.parse(data);
    return speakers;
  } catch (error) {
    console.error(`Erro na leitura do arquivo: ${error.message}`);
  }
}

async function registerNewSpeaker(newSpeaker) {
    const data = await fs.readFile(path.resolve(__dirname, PATH_TALKER));
    const speakers = JSON.parse(data);
    const nextId = (speakers[(speakers.length - 1)].id + 1);
    const newSpeakerWId = { id: nextId, ...newSpeaker };
    const updatedSpeakersList = [...speakers, newSpeakerWId]; 
    await fs.writeFile(path.resolve(__dirname, PATH_TALKER),
     JSON.stringify(updatedSpeakersList));
     return newSpeakerWId;
}

async function editSpeaker(id, updatedSpeaker) {
  const data = await fs.readFile(path.resolve(__dirname, PATH_TALKER));
  const speakers = JSON.parse(data);
  const updatedSpeakerWithId = { ...updatedSpeaker, id: Number(id) };
  const updatedSpeakersList = speakers.map((speaker) => {
    if (speaker.id !== Number(id)) {
      return speaker;
    } 
      return updatedSpeakerWithId;
  });
  await fs.writeFile(path.resolve(__dirname, PATH_TALKER),
  JSON.stringify(updatedSpeakersList));
  return updatedSpeakerWithId;
}
async function removeSpeaker(id) {
  const data = await fs.readFile(path.resolve(__dirname, PATH_TALKER));
  const speakers = JSON.parse(data);
  const updatedSpeakersList = speakers.filter((speaker) => speaker.id !== Number(id));
  await fs.writeFile(path.resolve(__dirname, PATH_TALKER),
  JSON.stringify(updatedSpeakersList));
}

async function getSpeakerByName(name) {
  const data = await fs.readFile(path.resolve(__dirname, PATH_TALKER));
  const speakers = JSON.parse(data);
  const searchedSpeakers = speakers
  .filter((speaker) => speaker.name.toLowerCase().includes(name.toLowerCase()));
  if (!searchedSpeakers) {
     return [];
  }
  return searchedSpeakers;
}

module.exports = { readSpeakersData, 
  registerNewSpeaker, 
  editSpeaker, 
  removeSpeaker, 
  getSpeakerByName };