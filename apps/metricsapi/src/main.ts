import express from 'express';
const app = express();
const path = require('path');

//setup static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.listen(3000, () => {
  console.log('>> Listening on port 3000');
});
