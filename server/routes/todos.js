var express = require('express');
var router = express.Router();
let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "z10mz10m",
    database: "JSON_placeholder"
});

//get all the todos
router.get("/todos/all/:id", function (req, res) {
    let sqlCommand = `SELECT title, completed, id, show
    FROM todos
    WHERE user_id = ${req.params.id}`
    con.query(sqlCommand, function (err, result) {
        if (err) console.log(err);
        res.send(JSON.stringify({ "answer": result }))
    });
})

router.post("/todos/changing", function (req, res) {
    let data = req.body
    let sqlCommand = `UPDATE users_info 
        SET title = '${data.value1}'
         WHERE title = '${data.value1} AND show = 1'`
    con.query(sqlCommand, function (err, result) {
        if (err) console.log(err);
        res.send({ "answer": result })
    });
})

router.post("/todos/complete", function (req, res) {
    let data = req.body
    let sqlCommand = `UPDATE users_info 
        SET completed = '${data.value2}'
         WHERE title = '${data.value1} AND show = 1'`
    con.query(sqlCommand, function (err, result) {
        if (err) console.log(err);
        res.send({ "answer": result })
    });
})


router.post("/todos/delete", function (req, res) {
    let data = req.body
    let sqlCommand = `UPDATE todos 
        SET show = 0
        WHERE title = '${data.value1}'`
    con.query(sqlCommand, function (err, result) {
        if (err) console.log(err);
        res.send({ "answer": result })
    });

})

// sqlCommand = `UPDATE comments 
//             SET show = 0
//             WHERE post_id = todos.id` 
//             con.query(sqlCommand, function (err, result) {
//                 if (err) console.log(err);

module.exports = router;