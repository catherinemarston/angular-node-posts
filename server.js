const http = require('http');

const server = http.createServer((req, res) => {
    res.end('this is my first response');
});
// once were in production there will be a port that will be specified by the hosting provider
server.listen(process.env.PORT || 3000);

