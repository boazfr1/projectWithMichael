const mysql = require('mysql');
const fs = require("fs")
const express = require("express")
const bodyParser = require('body-parser')
const cors = require("cors")
const data = require('./DB/database.json')
const commentsRouter = require("./routes/comments");
const postsRouter = require("./routes/posts")
const todosRouter = require("./routes/todos")
const userInfoRouter = require("./routes/userInfo")
const loginRouter = require("./routes/login")



//create the server:
const app = express();
const PORT = 3002;
app.use(cors())
app.use(express.json());

// app.use('/users/:id',authentication)

function authentication(req, res, next) {
    console.log(req.params.id);
    console.log(req.body.token);
    // res.json(404)
    // console.log('hello');
    next();
}
// const myLogger = function (req, res, next) {
//   console.log('LOGGED')
//   next()
// }

// app.use(myLogger)

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })


app.use('/users', userInfoRouter);
app.use('/todos', todosRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
app.use('/login/', loginRouter);



app.listen(PORT, (error) => {
    if (!error) {
        console.log(`listening on port ${PORT}`)
    } else {
        console.log("Error occurred, server can't start", error);
    }
});

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "z10mz10m",
    database: "JSON_placeholder"
});

// createDB('JSON_placeholder')

// createTables();

// fetchusers('users');

// setPasswords()
// fetchTodos('todos');
// fetchPosts('posts');
// fetchAlbums('albums');

// fetchComments('comments');
// fetchPhotos('photos');

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

async function fetchusers(item) {
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

async function fetchTodos(item) {
    let res = await fetch(`https://jsonplaceholder.typicode.com/${item}`);
    let data2 = await res.json();
    let keysArr = Object.keys(data[item])
    keysArr.shift();
    keysArr.pop();
    let keysString = keysArr.join(',');
    let values = data2.map(user => `( '${user.userId}', '${user.title}', '${user.completed ? 1 : 0}', 1)`);
    values = values.join(',');
    let sql = `INSERT INTO ${item} (${keysString}) VALUES ${values};`;
    con.query(sql, (err, result, fields) => {
        if (err) throw err;
        console.log(result);
    })
}

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

async function setPasswords() {
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