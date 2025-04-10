const express = require('express');
const app = express();

// Racine
app.get('/', (req, res) => {
  res.send('Timestamp Microservice');
});

// Endpoint principal
app.get('/api/:date?', (req, res) => {
  const { date } = req.params;
  let parsedDate;

  // Si aucun paramètre fourni
  if (!date) {
    parsedDate = new Date();
  } else {
    // Vérifie si c’est un timestamp numérique
    if (/^\d+$/.test(date)) {
      parsedDate = new Date(parseInt(date));
    } else {
      parsedDate = new Date(date);
    }
  }

  // Vérifie si la date est invalide
  if (parsedDate.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // Renvoie les bons champs JSON
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
