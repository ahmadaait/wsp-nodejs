const bodyParser = require('body-parser');
const express = require('express');
const mhsRoute = require('./src/routes/mahasiswaRoute');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/halo', (req, res) => {
  res.json({ messsage: 'halo express js' });
});

app.use('/', mhsRoute);

app.listen(3000);
