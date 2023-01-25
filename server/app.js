const mysql = require('mysql');
const fs = require("fs")




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

function readAndCreate(fileName) {
    console.log(fileName)
    fs.readFile(`./DB/${fileName}.json`, (err, data) => {
        if (err) console.log(err);
        let myData = JSON.parse(data.toString())
        con.connect(function (err) {
            if (err) throw err;
            let sqlTableName = `CREATE TABLE ${myData.tableName} `;
            for (let i = 0; i < myData.fields.length; i++) {
                let sqlCommand = ` ${myData.fields[i].name + " " + myData.fields[i].type}`
                con.query(sqlTableName + "(" + sqlCommand + ")", function (err, result) {
                    if (err) console.log(err);
                    console.log(result)
                });
            }
        })
    });
}

function insertManeger() {
    let sqlCommand = "INSERT INTO admin (admin_name, admin_password, school_id) VALUES ('david', 'david1234', 1),('aharon', 'aharon1234', 2)"
    con.query(sqlCommand, function (err, result) {
        if (err) console.log(err);
    });
}