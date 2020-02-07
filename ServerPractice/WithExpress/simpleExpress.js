const express = require('express');
const app = express();
const portNum = 42069;

app.use(express.json());

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

app.post('/thisIsAPost', (req, res) =>
{
	console.log('POST received');
	//console.log(req);
	//console.log(req.body);
	res.send('Got it!');
})

app.listen(portNum, () => console.log(`Example app listening on ${portNum}!`));