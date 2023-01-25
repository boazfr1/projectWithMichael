const mysql = require('mysql');
const fs = require("fs")
const express = require("express")
const bodyParser = require('body-parser')
// const cors = require("cors")
const data = require('./DB/database.json')
const commentsRouter = require("./routes/comments");
const postsRouter = require("./routes/posts")
const todosRouter = require("./routes/todos")
const userInfoRouter = require("./routes/userInfo")
const loginRouter = require("./routes/login")



//create the server:
const app = express();
const PORT = 3002;

app.use(express.json());

app.use('/user', userInfoRouter);
app.use('/user/', todosRouter);
app.use('/user/', postsRouter);
app.use('/user/', commentsRouter);
app.use('/login/', loginRouter);


  
app.listen(PORT, (error) =>{
    if(!error){
        console.log(`listening on port ${PORT}`)
    } else { 
        console.log("Error occurred, server can't start", error);
    }
});



//create the DB:
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "z10mz10m",
    database: "JSON_placeholder"
});

function createDB(name) {
    con.connect(err => {
        if (err) throw err;
        let sql = `CREATE DATABASE ${name};`;
        con.query(sql, function (err, result) {
            if (err) console.log(err);
            console.log(result)
        });
    })
}
// createDB('JSON_placeholder')



function createTables() {
    con.connect((err) => {
        if (err) throw err;
        console.log('connected');
        for (const key in data) {
            let titles = '';
            for (const k in data[key]) {
                titles += `${k} ${data[key][k]},`
            }
            titles = titles.slice(0, titles.length - 1)
            let sql = `CREATE TABLE ${key} (${titles});`
            console.log('sql: ',sql);
    
            con.query(sql, (err, result, fields) => {
                if (err) throw err;
                console.log(result);
            })
        }
    });
}
// createTables();






















// function readAndCreate(fileName) {
//     console.log(fileName)
//     fs.readFile(`./DB/${fileName}.json`, (err, data) => {
//         if (err) console.log(err);
//         let myData = JSON.parse(data.toString())
//         con.connect(function (err) {
//             if (err) throw err;
//             let sqlTableName = `CREATE TABLE ${myData.tableName} `;
//             for (let i = 0; i < myData.fields.length; i++) {
//                 let sqlCommand = ` ${myData.fields[i].name + " " + myData.fields[i].type}`
//                 con.query(sqlTableName + "(" + sqlCommand + ")", function (err, result) {
//                     if (err) console.log(err);
//                     console.log(result)
//                 });
//             }
//         })
//     });
// }

// function insertManeger() {
//     let sqlCommand = "INSERT INTO admin (admin_name, admin_password, school_id) VALUES ('david', 'david1234', 1),('aharon', 'aharon1234', 2)"
//     con.query(sqlCommand, function (err, result) {
//         if (err) console.log(err);
//     });
// }