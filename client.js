var http = require('http');

var userinfo = {
    'password': 'third_pass',
    'name': 'sunwoo'
};

var headers = {
    'Content-Type': 'application/json'
};

var options = {
    url: 'http://localhost',
    path: '/addUser/third_user',
    port: 80,
    method: 'POST',
    headers: headers
};

var req = http.request(options, function(err, res) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(res);
});

req.write(JSON.stringify(userinfo));
req.end();
