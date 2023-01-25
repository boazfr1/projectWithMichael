var express = require('express');
var router = express.Router();
let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "z10mz10m",
    database: "JSON_placeholder"
});

router.get("/userInfo/all/:id", function (req, res) {
    let sqlCommand = `SELECT *
    FROM users_info
    WHERE id = ${req.params.id}`
    con.query(sqlCommand, function (err, result) {
        if (err) console.log(err);
        res.send(JSON.stringify({ "answer": result }))
    });
})

router.post("/userInfo/:id", function (req, res) {
    let data = req.body
        let sqlCommand = `UPDATE users_info 
        SET name = '${data.value1}', user_name = '${data.value2}', 
        email = '${data.value3}', phone_number = '${data.value4}' 
        WHERE (name = '${data.value1}' AND show = 1)`
        con.query(sqlCommand, function (err, result) {
            if (err) console.log(err);
            res.send({ "answer": result })
        });
})

router.post("/userInfo/:id", function (req, res) {
    let data = req.body
        let sqlCommand = `UPDATE users_info 
        SET show = '0' 
        WHERE (name = '${data.value1}')`
        con.query(sqlCommand, function (err, result) {
            if (err) console.log(err);
            res.send({ "answer": true })
        });
})


module.exports = router;