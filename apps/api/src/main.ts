const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.listen(3000, () => {
  // Server is running
});
