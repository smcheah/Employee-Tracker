const mysql = require('mysql');
const inquirer = require('inquirer');
const c_table = require('console.table');

const connection = sql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "employees_db",
})

connection.connect( err => {
    if (err) throw err;
    init();
})