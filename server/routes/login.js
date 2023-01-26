let express = require('express');
let router = express.Router();
let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "z10mz10m",
    database: "JSON_placeholder"
});

router.post("/userName/:userName", function (req, res) {
    let data = req.body
    console.log("data:", data);
    let sqlCommand = `SELECT users.user_name, passwords.password
    FROM users
    INNER JOIN passwords
    ON users.id = passwords.user_id
    WHERE users.user_name = '${data.username}' 
    AND passwords.password = ${data.password} `
    console.log("sqlCommand:", sqlCommand);
    con.query(sqlCommand, function (err, result) {
        if (err) console.log(err);
        if (result.length > 0) {
            console.log("result.length:", result.length);
            sqlCommand = `SELECT *
            FROM users
            WHERE user_name = '${data.username}'`
            console.log("sqlCommand2:", sqlCommand);
            
            con.query(sqlCommand, function (err, user) {
                if (err) console.log(err);
                console.log("user:", user);
                res.send(JSON.stringify({ "answer": user, "bool": true }))
            })
        } else {
            res.send(JSON.stringify({ "bool": false }))
        }
    });
})

// router.post("/posts/changing", function (req, res) {
//     let data = req.body
//     let sqlCommand = `UPDATE users 
//         SET title = '${data.value2}' body = '${data.value3}'
//          WHERE id = '${data.value1}' AND exist = 1`
//     con.query(sqlCommand, function (err, result) {
//         if (err) console.log(err);
//         res.send({ "answer": result })
//     });
// })

module.exports = router;