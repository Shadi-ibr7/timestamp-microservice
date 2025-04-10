const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

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
  console.log(`Server running on port ${PORT}`);
});
