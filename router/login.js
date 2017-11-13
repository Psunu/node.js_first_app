module.exports = function(app, fs) {
    app.get('/login/:username/:password', function(req, res) {
        var result = { };

        fs.readFile(__dirname + "/../data/user.json", "utf8", function(err, data) {
            if (err) {
                console.log(data);
                result.success = 0;
                result.error = "internal read user error";
                res.json(result);
                return;
            }

            var users = JSON.parse(data);
            if (users[req.params.username].password == req.params.password) {
                var sess = req.session;
                sess.username = req.params.username;
                sess.name = users[req.params.username].name;
                result.success = 1;
                res.json(result);
            } else {
                result.success = 0;
                result.error = "incorrect";
                res.json(result);
            }
        });
    });

    app.get('/logout', function(req, res) {
        var sess = req.session;
        if (sess.username) {
            req.session.destroy(function(err) {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/');
                }
            });
        } else {
            res.redirect('/');
        }
    });
};
