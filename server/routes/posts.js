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

// router.get(``)

router.get("posts/:postId", (req, res) => {
    let sqlCommand = `SELECT title, body, id, exist
    FROM posts
    WHERE user_id = ${req.params.id}`
    con.query(sqlCommand, (err, result) => {
        if (err) console.log(err);
        res.send(JSON.stringify('{ "answer": result }'))
    });
})

router.post("/posts/changing", function (req, res) {
    let data = req.body
    let sqlCommand = `UPDATE users 
        SET title = '${data.value2}' body = '${data.value3}'
         WHERE id = '${data.value1}' AND exist = 1`
    con.query(sqlCommand, function (err, result) {
        if (err) console.log(err);
        res.send({ "answer": result })
    });
})

module.exports = router;