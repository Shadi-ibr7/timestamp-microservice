const express = require('express');
const app = express();

// Page d'accueil
app.get('/', (req, res) => {
  res.send('Timestamp Microservice');
});

// Route API avec date facultative
app.get('/api/:date?', (req, res) => {
  const input = req.params.date;
  let date;

  if (!input) {
    date = new Date();
  } else if (!isNaN(input)) {
    // Timestamp (nombre)
    date = new Date(parseInt(input));
  } else {
    // Date string
    date = new Date(input);
  }

  if (date.toString() === 'Invalid Date') {
    res.json({ error: 'Invalid Date' });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// Démarrer serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
