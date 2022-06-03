const express = require('express');
const cors = require('cors');
require('dotenv').config(); 

const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const app = express();

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);

app.use(cors());

const PORT = process.env.PORT || 3000;

const hereIsTheUpsideDown = process.env.UPSIDEDOWN_MODE;
console.log(hereIsTheUpsideDown);
const changeBoolean = hereIsTheUpsideDown.toLocaleLowerCase() === 'true';
console.log(changeBoolean);

// fonte utilizada, para mudar string para bool: https://pt.stackoverflow.com/questions/235272/como-converter-uma-string-em-booleano

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    changeBoolean,
  );

  res.status(200).json(characters);
});

app.listen(PORT, () => {
  console.log(`Escutando na porta 3000 ${PORT}`);
});
