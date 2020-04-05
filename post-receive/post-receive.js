const http = require('http');
const ps = require('child_process');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
	  res.statusCode = 200;
	  console.log('received');
	  ps.exec('/bin/bash /web/www/post-receive/post-receive.sh');
	  res.setHeader('Content-Type', 'text/plain');
	  res.end('Hello World');
});

server.listen(port, () => {
	  console.log(`Server running at http://${hostname}:${port}/`);
});
