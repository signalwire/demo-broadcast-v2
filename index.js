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

let {createSession, createChannel} = require("better-sse");
const channel = createChannel();

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

app.post("/notify", async (req, res, next) => {
  channel.broadcast(req.body.member_id);
  res.json({ status: 'ok' });
})

app.get("/sse", async (req, res) => {
	const session = await createSession(req, res);
	channel.register(session);
});

const port = process.env.PORT || 5000;
server.listen(port, function() {
  console.log(`http/ws server listening on ${port}`);
});