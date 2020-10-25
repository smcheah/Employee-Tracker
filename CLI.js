const mysql = require('mysql');
const inquirer = require('inquirer');
const c_table = require('console.table');
const { nanoid } = require('nanoid'); // user.id = nanoid(10)

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "employees_db",
})

connection.connect( err => {
    if (err) throw err;
    console.log("connected to server, id: " + connection.threadId + "\n");
    init();
})

function init() {
    console.log(
`----------------------------------
        EMPLOYEE TRACKER 
----------------------------------`)

    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all',
                'View all by department id',
                'View all by role id',
                'View all by employee id',
                'Add a new department',
                'Add a new role',
                'Add a new employee',
                'Update employee'
            ]
        }
    ]).then(answer => {
        console.log(answer.action)
    })
}