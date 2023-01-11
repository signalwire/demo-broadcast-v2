require('dotenv').config()

let express = require('express');
let app = express();

const http = require('http');
const server = http.createServer(app);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 5000;

app.use(express.json());

var expressLayouts = require('express-ejs-layouts');
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static('public'))

const { getToken } = require('./lib/utility')
const { videoClient } = require('./lib/video')

app.get('/', async (req, res) => {
  const user = 'user_' + Math.floor(Math.random() * 1000);
  token = await getToken(user, 'ads-demo');
  res.render('index');
})

app.get('/audience', async (req, res) => {
  const user = 'user_' + Math.floor(Math.random() * 1000);
  token = await getToken(user, 'ads-demo', 'audience');
  res.render('audience');
})

const port = process.env.PORT || 5000;
server.listen(port, function() {
  console.log(`http/ws server listening on ${port}`);
});