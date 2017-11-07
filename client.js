var http = require('http');

var options = {
  host: 'localhost',
  port: '8000',
  path: '/index.html'
};

http.request(options, function(response) {
  var body = '';
  response.on('data', function(data) {
    body += data;
  });

  response.on('end', function() {
    console.log(body);
  });
}).end();
