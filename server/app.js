const mysql = require('mysql');
const data = require('./DB/database.json')

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
        if (err) throw err;
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
    let values = data2.map(user => `( '${user.userId}', '${user.title}', '${user.completed ? 1 : 0}', 1)`);
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
    console.log(values.length);
    // for (let i = 0; i < values.length / 100; i++) {
    //     let sql = `INSERT INTO ${item} (${keysString}) VALUES ${values.slice(i * 100, (i + 1) * 100)};`;
    //     con.query(sql, (err, result, fields) => {
    //         if (err) throw err;
    //         console.log(result);
    //     })
    // }
    values = values.join(',');
    let sql = `INSERT INTO ${item} (${keysString}) VALUES ${values};`;
    con.query(sql, (err, result, fields) => {
        if (err) throw err;
        console.log(result);
    })
}
// fetchComments('comments');
