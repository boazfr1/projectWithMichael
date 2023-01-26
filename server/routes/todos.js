var express = require('express');
var router = express.Router();
let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "z10mz10m",
    database: "JSON_placeholder"
});

//get all todos
router.get("/:userId", (req, res) => {
    // console.log('req.params.id: ', req.params.userId);
    // console.log('req.url: ', req.url);
    let sqlCommand = `SELECT title, completed, id, exist
    FROM todos
    WHERE user_id = ${req.params.userId}`
    con.query(sqlCommand, (err, result) => {
        if (err) throw (err);
        res.json(result)
    });
})

//get todo by id
router.get("/:userId/:id", (req, res) => {
    let sqlCommand = `SELECT title, completed, id, exist
    FROM todos
    WHERE user_id = ${req.params.userId}
    AND id = ${req.params.id}`
    con.query(sqlCommand, (err, result) => {
        if (err) throw (err);
        res.json(result)
    });
})

//post all
router.post("/:userId", (req, res) => {
    let arr = req.body
    console.log('arr: ', arr);
    let values = ''
    arr.forEach(item => {
        values += `(${item.id}, '${item.title}', ${item.completed?1:0}, ${item.exist?1:0}),`;
    });
    values = values.slice(0, -1);
    let sql = `INSERT INTO todos (id, title, completed, exist) VALUES 
    ${values}
    ON DUPLICATE KEY UPDATE 
    title = VALUES(title), 
    completed = VALUES(completed), 
    exist = VALUES(exist)`;
    console.log('sql: ', sql);
    
    con.query(sql, (err, result) => {
    //     if (err) throw (err);
    //     console.log(result);
    //     res.json(result)
    });
})

//post one
router.post("/:userId/:id", (req, res) => {
    let { id, title, column } = req.body
    let sqlCommand = `UPDATE todos 
        SET ${column} = '${title}'
         WHERE id = '${id}' 
         AND exist = 1
         AND user_id = '${req.params.userId}'`
    con.query(sqlCommand, (err, result) => {
        if (err) console.log(err);
        res.json(result)
    });
})

//delete
router.delete("/:userId/todos/:id", (req, res) => {
    // let {id} = req.body
    let sqlCommand = `UPDATE todos 
        SET exist = 0
        WHERE id = '${req.params.id}'
        AND user_id = '${req.params.userId}'`
    con.query(sqlCommand, (err, result) => {
        if (err) console.log(err);
        res.json(result)
    });

})

module.exports = router;