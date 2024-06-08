const express = require('express');
const path = require('path')
process.loadEnvFile()

const app = express();

const port = parseInt(process.env.PORT) || process.argv[3] || 8082;

const { dbConnection } = require('./config/config')

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api', (req, res) => {
  res.json({"msg": "UN SALUDO A IKER"});
});

dbConnection();

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})


