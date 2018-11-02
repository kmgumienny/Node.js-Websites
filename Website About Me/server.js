var http = require('http'),
  fs = require('fs'),
  url = require('url'),
  port = 8080;

var server = http.createServer(function(req, res) {
  var uri = url.parse(req.url)

  switch (uri.pathname) {
    case '/':
      sendFile(res, 'index.html')
      break
    case '/index.html':
      sendFile(res, 'index.html')
      break
    case '/styles.css':
      sendFile(res, 'styles.css')
      break
    case '/kubus.jpg':
      sendFile(res, 'kubus.jpg')
      break
    case '/background.jpg':
      sendFile(res, 'background.jpg')
      break
    case '/gym.jpg':
      sendFile(res, 'gym.jpg')
      break
    case '/music.jpg':
      sendFile(res, 'music.jpg')
      break
    case '/thetachi.jpg':
      sendFile(res, 'thetachi.jpg')
      break
    default:
      res.end('404 not found')
  }
})

server.listen(process.env.PORT || port);
console.log('listening on 8080')

// subroutines

function sendFile(res, filename) {

  fs.readFile(filename, function(error, content) {
    res.writeHead(200, {'Content-type': 'text/html'})
    res.end(content, 'utf-8')
  })

}
