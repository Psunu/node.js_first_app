module.exports = function(app, fs) {
    app.get('/list', function(req, res) {
        fs.readFile(__dirname + "/../data/user.json", "utf8", function(err, data) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(data);
            res.end(data);
        });
    });

    app.get('/getUser/:username', function(req, res) {
        fs.readFile(__dirname + "/../data/user.json", "utf8", function(err, data) {
            if (err) {
                console.log(err);
                return;
            }

            var users = JSON.parse(data);
            var userinfo = JSON.stringify(users[req.params.username], null, '\t');

            console.log(userinfo);
            res.end(userinfo);
        });
    });

    app.post('/addUser/:username', function(req, res) {
        var result = { };
        var username = req.params.username;

        if (!req.body.password || !req.body.name) {
            result.success = 0;
            result.error = "invalid request";
            res.json(result);
            return;
        }

        fs.readFile(__dirname + "/../data/user.json", "utf8", function(err, data) {
            if (err) {
                console.log(err);
                return;
            }

            var users = JSON.parse(data);
            if (users[username]) {
                result.success = 0;
                result.error = "duplicate";
                res.json(result);
                return;
            }

            users[username] = req.body;
            fs.writeFile(__dirname + "/../data/user.json",
                        JSON.stringify(users, null, '\t'), "utf8", function(err, data) {
                if (err) {
                    console.log(err);
                    return;
                }

                result.success = 1;
                res.json(result);
            });
        });
    });

    app.put('/updateUser/:username', function(req, res) {
        var result = { };

        if(!req.body.password || !req.body.name) {
            result.success = 0;
            result.error = "invalid request";
            res.json(result);
            return;
        }

        fs.readFile(__dirname + "/../data/user.json", "utf8", function(err, data) {
            if (err) {
                console.log(err);
                return;
            }

            var users = JSON.parse(data);
            users[req.params.username] = req.body;
            fs.writeFile(__dirname + "/../data/user.json",
                    JSON.stringify(users, null, '\t'), "utf8", function(err, data) {
                if (err) {
                    console.log(err);
                    return;
                }
                result.success = 1;
                res.json(result);
            });
        });
    });

    app.delete('/deleteUser/:username', function(req, res) {
        var result = { };

        fs.readFile(__dirname + "/../data/user.json", "utf8", function(err, data) {
            if (err) {
                console.log(err);
                return;
            }

            var users = JSON.parse(data);
            if (!users[req.params.username]) {
                result.success = 0;
                result.error = "Not found";
                res.json(result);
                return;
            }

            delete users[req.params.username];
            fs.writeFile(__dirname + "/../data/user.json",
                        JSON.stringify(users, null, '\t'), "utf8", function(err, data) {
                if (err) {
                    console.log(err);
                    return;
                }

                result.success = 1;
                res.json(result);
            });
        });
    });
};
