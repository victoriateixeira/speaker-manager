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

module.exports = readSpeakersData;