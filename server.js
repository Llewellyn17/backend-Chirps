const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express();
const port = '3000';


app.use(bodyParser.urlencoded({ extended: false }));




app.post('/scores', (req, res) => {
    let name = req.body.name;
    let score = req.body.score;
    let item = { "name": name, "score": score };
    fs.appendFileSync(dataPath,
        JSON.stringify(item, null, 4), 'utf-8', err => console.log(err));
    res.redirect('/');

});


app.use(express.static(path.join(__dirname, 'looks')));

app.listen(port, function () {
    console.log('Server listening on port' + port);
});




let mysql = require('mysql');

let connection = mysql.createConnection({
    connectionLimit: 10,
    host: 'localhost',
    user: 'Llewellyn',
    password: 'InnovateBham2019',
    database: 'Chirps'
});

connection.connect();

// connection.query('SELECT 1 + 1 ', function (err, rows, fields) {
//   if (err) throw err

//   console.log('The solution is: ', rows[0].solution)
// });

app.get("/users", (req, res) => {
    connection.query('SELECT * FROM users',
        function (err, results, fields) {
            if (err) {

                return console.log(err);
            }
            res.send(results);

        })
});

app.get("/user/:id", (req, res) => {
    connection.query('SELECT * FROM users WHERE id =?',
        [req.params.id],
        function (err, results, fields) {
            if (err) {

                return console.log(err);
            }
            res.send(results);

        })
});


app.get("/chirps", (req, res) => {
    connection.query('SELECT * FROM chirps',
        function (err, results, fields) {
            if (err) {

                return console.log(err);
            }
            res.send(results);

        })
});

app.get("/chirps/:userid", (req, res) => {
    connection.query('SELECT * FROM chirps WHERE userid =?',
        [req.params.userid],
        function (err, results, fields) {
            if (err) {

                return console.log(err);
            }
            res.send(results);

        })
});

app.post("/user", (req, res) => {
    connection.query('INSERT INTO users( name, email, password) VALUES ("jeff", "Hottopic@yahoo.com", "elephant")',
        function (err, results, fields) {
            if (err) {

                return console.log(err);
            }
            res.send(results)
        })
});


app.post("/chirps", (req, res) => {
    connection.query('INSERT INTO Chirps( userid, text, location) VALUES ("11", "Nicole You dont suck", "Mobile")',
        function (err, results, fields) {
            if (err) {

                return console.log(err);
            }
            res.send(results)
        })
});

app.delete("/chirps/:name", (req, res) => {
    connection.query('DELETE FROM Chirps WHERE id = 101',
        [req.params.id]
                function (err, results, fields) {
            if (err) {

                return console.log(err);
            }
            res.send(results)
        })
});

app.delete("/user/:id", (req, res) => {
    connection.query('DELETE FROM users WHERE id = 11',
        function (err, results, fields) {
            if (err) {

                return console.log(err);
            }
            res.send(results)
        })
});   