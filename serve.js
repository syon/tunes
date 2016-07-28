const nodeStatic = require('node-static');

const serve = new nodeStatic.Server(`${__dirname}/public/`);
require('http').createServer((req, res) => {
  req.addListener('end', () => serve.serve(req, res));
  req.resume();
}).listen(7777);
