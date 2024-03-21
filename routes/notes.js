const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const fs = require('fs');


// GET Route for retrieving all notes
router.get('/', (req, res) => {
    readFromFile('./db/db.json') // Adjusted the file path to './db/db.json'
        .then((data) => res.json(JSON.parse(data)))
        .catch((err) => res.status(500).json({ error: err.message }));
});

// POST Route for adding a new note
router.post('/', (req, res) => {
    const { title, text } = req.body;

    if (!title || !text) {
        return res.status(400).json({ error: 'Title and text are required' });
    }

    const newNote = {
        id: uuidv4(),
        title,
        text,
    };

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const parsedData = JSON.parse(data);
          console.log(parsedData),
          parsedData.push(newNote);

         fs.writeFile('./db/db.json', JSON.stringify(parsedData), (err) => {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
          });
          
          return parsedData
        }
    });
    res.json(newNote)
});

module.exports = router;
