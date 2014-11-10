var http = require('http');
var mime = require('mime');
var fs = require('fs');
var path = require('path');
var cache = {};

function staticServer(response, cache, filePath) {
  if (cache[filePath]) {
    getFile(response, path, cahce[filePath]);
  } else {
    fs.readFile(filePath, function(status, data){
      cache[filePath] = data;
      getFile(response, filePath, data)
    })
  }

}

function getFile(response, filePath, content) {
  response.writeHead(200,
    {'Content-Type': mime.lookup(
          path.basename(filePath)
          )
    });
  response.end(content);
}


http.createServer(function (req, res) {
  var filePath = false;
  if(req.url === '/') {
    filePath = 'index.html';
  } else {
    filePath = req.url
  }
  var fullPath = './' + filePath;
  staticServer(res, cache, fullPath)
}).listen(process.env.PORT || 3000);
console.log('Server running at http://localhost:3000/')