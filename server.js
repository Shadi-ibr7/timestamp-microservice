const express = require('express');
const app = express();

// Middleware racine
app.get('/', (req, res) => {
  res.send('Timestamp Microservice');
});

// Endpoint principal
app.get('/api/:date?', (req, res) => {
  let { date } = req.params;
  let parsedDate;

  // Cas sans paramètre : date actuelle
  if (!date) {
    parsedDate = new Date();
  } else {
    // Vérifie si c'est un timestamp numérique
    if (/^\d+$/.test(date)) {
      parsedDate = new Date(Number(date));
    } else {
      parsedDate = new Date(date);
    }
  }

  // Vérification de validité
  if (parsedDate.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
