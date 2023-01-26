let express = require('express');
let router = express.Router();
let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "z10mz10m",
    database: "JSON_placeholder"
});

router.get("/userName/:userName/:password", function (req, res) {
    let sqlCommand = `SELECT users.user_name, password.password
    FROM users
    INNER JOIN password
    ON users.id = password.user_id
    WHERE users.user_name = ${req.params.userName} 
    AND password.password = ${req.params.password} `
    con.query(sqlCommand, function (err, result) {
        if (err) console.log(err);
        if (result.length > 0) {
            sqlCommand = `SELECT *
            FROM user_name
            WHERE user_name = ${req.params.userName}`
            con.query(sqlCommand, function (err, res) {
                if (err) console.log(err);
            })
            res.send(JSON.stringify({ "answer": res, "bool": true }))
        } else {
            res.send(JSON.stringify({ "answer": false }))
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