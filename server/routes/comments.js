var express = require('express');
var router = express.Router();
let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "z10mz10m",
    database: "JSON_placeholder"
});

//get all the comments
router.get("/all/:id", function (req, res) {
    let str;  
    let sqlCommand = `SELECT body
    FROM comments
    WHERE post_id = ${req.params.id}`
    con.query(sqlCommand, function (err, result) {
        // str = result[0].body.tostring()
        if (err) console.log(err);
        res.send(JSON.stringify({ "answer": result }))
    });
})

router.post("/comments/changing", function (req, res) {
    let data = req.body
    let sqlCommand = `UPDATE comments 
        SET name = '${data.value2}' body = '${data.value3}'
         WHERE id = '${data.value1}' AND exist = 1`
    con.query(sqlCommand, function (err, result) {
        if (err) console.log(err);
        res.send({ "answer": result })
    });
})

router.post("/comments/delete", function (req, res) {
    let data = req.body
    let sqlCommand = `UPDATE comments 
        SET exist = '0'
         WHERE id = '${data.value1}'`
    con.query(sqlCommand, function (err, result) {
        if (err) console.log(err);
        res.send({ "answer": result })
    });
})


module.exports = router;