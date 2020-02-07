const http = require('http');
const fs = require('fs');
const path = require('path');
const httpServer = http.createServer(requestResponseHandler);
const portNum = 42069
httpServer.listen(portNum, () => 
{
	console.log('Node.js static file server on port #' + portNum)
})
function requestResponseHandler(request, response)
{
	console.log(`Request from: $(request.url)`);
	if (request.url === '/')
	{
		sendResponse('index.html', 'text/html', response)
	}
	else
	{
		sendResponse(request.url, getContentType(request.url), response);
	}
}

function sendResponse(url, contentType, res) 
{
	let file = path.join(__dirname, url);
	fs.readFile(file, (err, content) => 
	{
		if (err)
		{
			res.writeHead(404);
			res.write(`File '${file}' was not found ;(`);
			res.end();
		}
		else
		{
			res.writeHead(200, {'Content-Type': contentType});
			res.write(content);
			res.end();
			console.log(`Response: 200 ${file}`);
		}
	})
}
function getContentType(url)
{
	switch (path.extname(url))
	{
		case '.html':
			return 'text/html';
		case '.css':
			return 'text/css';
		case '.js':
			return 'text/javascript';
		case '.json':
			return 'application/json'
		default:
			return 'application/octate-stream';
	}
}