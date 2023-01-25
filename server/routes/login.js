let express = require('express');
let router = express.Router();
let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "z10mz10m",
    database: "JSON_placeholder"
});

//get all the posts
router.get("/userName/:userName/:password", function (req, res) {
    let sqlCommand = `SELECT users_info.user_name, password.password
    FROM users_info
    INNER JOIN password
    ON users_info.id = password.user_id
    WHERE users_info.user_name = ${req.params.userName} 
    AND password.password = ${req.params.password} `
    con.query(sqlCommand, function (err, result) {
        if (err) console.log(err);
        if (result.length > 0) {
            res.send(JSON.stringify({ "answer": true }))
        } else {
            res.send(JSON.stringify({ "answer": false }))
        }
    });
})

// router.post("/posts/changing", function (req, res) {
//     let data = req.body
//     let sqlCommand = `UPDATE users_info 
//         SET title = '${data.value2}' body = '${data.value3}'
//          WHERE id = '${data.value1}' AND show = 1`
//     con.query(sqlCommand, function (err, result) {
//         if (err) console.log(err);
//         res.send({ "answer": result })
//     });
// })

module.exports = router;