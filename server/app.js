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



app.listen(PORT, (error) => {
    if (!error) {
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
        for (const key in data) {
            let titles = '';
            for (const k in data[key]) {
                titles += `${k} ${data[key][k]},`
            }
            titles = titles.slice(0, titles.length - 1)
            let sql = `CREATE TABLE ${key} (${titles});`
            console.log('sql: ', sql);

            con.query(sql, (err, result, fields) => {
                if (err) throw err;
                console.log(result);
            })
        }
    });
}
// createTables();

async function fetchusers(item) {
    console.log("hiiiiiiiiiiiiiiiiii");
    let res = await fetch(`https://jsonplaceholder.typicode.com/${item}`);
    let data2 = await res.json();
    let keysArr = Object.keys(data[item])
    keysArr.shift();
    let keysString = keysArr.join(',');
    let values = data2.map(user => `( '${user.name}', '${user.username}', '${user.email}', '${user.phone}', 1)`);
    values = values.join(',');
    let sql = `INSERT INTO ${item} (${keysString}) VALUES ${values};`;
    console.log('sql: ', sql);
    con.query(sql, (err, result, fields) => {
        if (err) throw (err);
        console.log(result);
    })
}
// fetchusers('users');

async function fetchTodos(item) {
    let res = await fetch(`https://jsonplaceholder.typicode.com/${item}`);
    let data2 = await res.json();
    let keysArr = Object.keys(data[item])
    keysArr.shift();
    keysArr.pop();
    let keysString = keysArr.join(',');
    let values = data2.map(user => `( '${user.userId}', '${user.title}', '${user.completed ? 1:0}', 1)`);
    values = values.join(',');
    let sql = `INSERT INTO ${item} (${keysString}) VALUES ${values};`;
    con.query(sql, (err, result, fields) => {
        if (err) throw err;
        console.log(result);
    })
}
// fetchTodos('todos');

async function fetchPosts(item) {
    let res = await fetch(`https://jsonplaceholder.typicode.com/${item}`);
    let data2 = await res.json();
    let keysArr = Object.keys(data[item])
    keysArr.shift();
    keysArr.pop();
    let keysString = keysArr.join(',');
    let values = data2.map(user => `( '${user.userId}', '${user.title}', '${user.body}', 1)`);
    values = values.join(',');
    let sql = `INSERT INTO ${item} (${keysString}) VALUES ${values};`;
    con.query(sql, (err, result, fields) => {
        if (err) throw err;
        console.log(result);
    })
}
// fetchPosts('posts');

async function fetchComments(item) {
    let res = await fetch(`https://jsonplaceholder.typicode.com/${item}`);
    let data2 = await res.json();
    let keysArr = Object.keys(data[item])
    keysArr.shift();
    keysArr.pop();
    let keysString = keysArr.join(',');
    let values = data2.map(user => `( '${user.postId}', '${user.name}', '${user.email}', '${user.body}', 1)`);
    values = values.join(',');
    let sql = `INSERT INTO ${item} (${keysString}) VALUES ${values};`;
    con.query(sql, (err, result, fields) => {
        if (err) throw err;
        console.log(result);
    })
}
// fetchComments('comments');

async function fetchAlbums(item) {
    let res = await fetch(`https://jsonplaceholder.typicode.com/${item}`);
    let data2 = await res.json();
    let keysArr = Object.keys(data[item])
    keysArr.shift();
    keysArr.pop();
    let keysString = keysArr.join(',');
    let values = data2.map(user => `( '${user.userId}', '${user.title}', 1)`);
    values = values.join(',');
    let sql = `INSERT INTO ${item} (${keysString}) VALUES ${values};`;
    con.query(sql, (err, result, fields) => {
        if (err) throw err;
        console.log(result);
    })
}
// fetchAlbums('albums');

async function fetchPhotos(item) {
    let res = await fetch(`https://jsonplaceholder.typicode.com/${item}`);
    let data2 = await res.json();
    let keysArr = Object.keys(data[item])
    keysArr.shift();
    keysArr.pop();
    let keysString = keysArr.join(',');
    let values = data2.map(user => `( '${user.albumId}', '${user.title}', '${user.thumbnailUrl}', 1)`);
    values = values.join(',');
    let sql = `INSERT INTO ${item} (${keysString}) VALUES ${values};`;
    con.query(sql, (err, result, fields) => {
        if (err) throw err;
        console.log(result);
    })
}
// fetchPhotos('photos');

async function setPasswords(){
    let res = await fetch(`https://jsonplaceholder.typicode.com/users`);
    let data2 = await res.json();
    console.log('data2: ', data2);
    // let keysArr = Object.keys(data[item])
    // keysArr.shift();
    // keysArr.pop();
    // let keysString = keysArr.join(',');
    let values = data2.map(user => `('${user.id}', '1234', 1)`);
    // console.log('values: ', values);
    values = values.join(',');
    // console.log('values: ', values);
    let sql = `INSERT INTO passwords (user_id, password, exist) VALUES ${values};`;
    console.log('sql: ', sql);

    con.query(sql, (err, result, fields) => {
        if (err) throw err;
        console.log(result);
    })
}
// setPasswords()