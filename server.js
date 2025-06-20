const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const filePath = path.join(__dirname, 'latest_command.txt');

app.use(express.text());

// POST request: Save incoming code
app.post('/', (req, res) => {
  fs.writeFile(filePath, req.body, (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return res.status(500).send('Error saving command.');
    }
    console.log('Command saved:', req.body);
    res.type('text/plain').send('Command saved.');
  });
});


// GET request: Return last command
app.get('/', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.warn('No command file yet.');
      return res.send('');
    }
    res.send(data);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
