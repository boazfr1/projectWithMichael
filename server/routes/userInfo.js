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
    FROM users
    WHERE id = ${req.params.id}`
    con.query(sqlCommand, function (err, result) {
        if (err) console.log(err);
        console.log("result:", result);
        res.send(JSON.stringify({ "answer": result }))
    });
})

router.post("/userInfo/:id", function (req, res) {
    let data = req.body
        let sqlCommand = `UPDATE users 
        SET name = '${data.value5}', user_name = '${data.value2}', 
        email = '${data.value3}', phone_number = '${data.value4}' 
        WHERE (id = '${data.value1}' AND exist = 1)`
        con.query(sqlCommand, function (err, result) {
            if (err) console.log(err);
            res.send({ "answer": result })
        });
})

router.post("/userInfo/delete/:id", function (req, res) {
    let data = req.body
        let sqlCommand = `UPDATE users 
        SET exist = '0' 
        WHERE (id = '${data.value1}')`
        con.query(sqlCommand, function (err, result) {
            if (err) console.log(err);
            res.send({ "answer": true })
        });
})


module.exports = router;