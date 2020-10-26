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

    // try {

    // } catch(err) {
    //     console.log(err)
    // }
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
                'Update employee',
                'quit',
            ]
        }
    ]).then(answer => {
        switch (answer.action) {
            case 'View all':
                viewAll();
                break;
            case 'View all by department id':
                break;
            case 'View all by role id':
                break;
            case 'View all by employee id':
                break;
            case 'Add a new department':
                break;
            case 'Add a new role':
                break;
            case 'Add a new employee':
                break;
            case 'Update employee':
                break;
            case 'quit':
                console.log('goodbye!')
                connection.end();
                break;
            default:
                console.log('Oops! Something went wrong.');
                init();
                break;
        }
        
    })
}

function viewAll() {
    const results = []
    connection.query(
        `SELECT 
            employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name
        FROM employee 
        INNER JOIN role ON (role.id = employee.role_id)
        INNER JOIN department ON (role.department_id = department.id)`,
        function (err, result) {
            result.forEach(element => {
                results.push(element)
            });
            console.table(results);
            init();
        }
    )
}