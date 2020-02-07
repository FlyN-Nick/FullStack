var http = require('http');
let portNum = 3000;
// create a server object:
http.createServer(function (req, res) 
{
	res.write('wHaT uP wOrLd'); // write a response
	res.end(); // end the response
}).listen(portNum, function()
{
	console.log("sever at port #" + portNum); // the server object listens on port 3000
})