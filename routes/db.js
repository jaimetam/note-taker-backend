const db = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

// GET Route for retrieving all the tips
db.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// GET Route for a specific tip
db.get('/:db_id', (req, res) => {
  const DbId = req.params.db_id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((db) => db.db_id === DbId);
      return result.length > 0
        ? res.json(result)
        : res.status(404).json('No tip with that ID');
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// POST Route for adding a new tip
db.post('/', (req, res) => { // Corrected the route path
  const { title, text } = req.body;

  if (title && text) {
    const newDb = {
      title,
      text,
      db_id: uuidv4(),
    };

    readAndAppend(newDb, './db/db.json')
      .then(() => res.json('Tip added successfully'))
      .catch((err) => res.status(500).json({ error: err.message }));
  } else {
    res.status(400).json('Error: Title and text are required');
  }
});

module.exports = db;