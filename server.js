const express = require('express');
const app = express();

// Racine pour vérifier que le serveur tourne
app.get('/', (req, res) => {
  res.send('Timestamp Microservice');
});

// Point d’entrée principal
app.get('/api/:date?', (req, res) => {
  let { date } = req.params;
  let parsedDate;

  // Si aucun paramètre -> date actuelle
  if (!date) {
    parsedDate = new Date();
  } else {
    // Si c’est un nombre uniquement => timestamp
    if (/^\d+$/.test(date)) {
      // Vérifie si c’est en secondes => convertir en millisecondes
      parsedDate = new Date(parseInt(date));
    } else {
      parsedDate = new Date(date);
    }
  }

  // Gérer les cas invalides
  if (parsedDate.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // Retourne réponse JSON correcte
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});

// Serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
