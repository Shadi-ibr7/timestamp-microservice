const express = require('express');
const app = express();

// Forcer Content-Type JSON pour FreeCodeCamp
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Racine
app.get('/', (req, res) => {
  res.send('Timestamp Microservice');
});

// Endpoint principal
app.get('/api/:date?', (req, res) => {
  const input = req.params.date;
  let date;

  if (!input) {
    date = new Date();
  } else if (/^\d+$/.test(input)) {
    date = new Date(parseInt(input));
  } else {
    date = new Date(input);
  }

  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
