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
    console.log(`
========== EMPLOYEE TRACKER ==========
`)

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
                'View all departments',
                'View all roles',
                'View all employees',
                'View employees by manager name',
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
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'View employees by manager name':
                viewByManager(); //
                break;
            case 'Add a new department':
                addDepartment();
                break;
            case 'Add a new role':
                addRole();
                break;
            case 'Add a new employee':
                addEmployee();
                break;
            case 'Update employee':
                updateEmployee();
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

function updateEmployee() {
    
}
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstname',
            message: 'Input first name:'
        },
        {
            type: 'input',
            name: 'lastname',
            message: 'Input last name:'
        },
        {
            type: 'input',
            name: 'role',
            message: 'Input role id:'
        },
        {
            type: 'input',
            name: 'manager',
            message: 'Input manager id:',
            default: 'NULL'
        },
    ]).then(employee => {
        let query;
        if (employee.manager === 'NULL') {
            query = `INSERT INTO employee(first_name, last_name, role_id) VALUES (?, ?, ?)`
        } else {
            query = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`
        }
        connection.query(
            // SET first_name=?, last_name=?, role_id=?, manager_id=?;
            query,
            [
                employee.firstname, employee.lastname, employee.role, employee.manager
            ],
            function (err, result) {
                if (err) throw err;
                console.log(`\nInserted [${employee.firstname}, ${employee.lastname}, ${employee.role}, ${employee.manager}] into employee table!`)
                init();
            }
        )
    })
}
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Input role name:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Input role salary:'
        },
        {
            type: 'input',
            name: 'department',
            message: 'Input department id:'
        },
    ]).then(role => {
        connection.query(
            `INSERT INTO role(title, salary, department_id)
            VALUES (?, ?, ?)`,
            [role.name,
            role.salary,
            role.department],
            function (err, result) {
                if (err) throw err;
                console.log(`\nInserted [${role.name}, ${role.salary}, ${role.department}] into role table!`)
                init();
            }
        )
    })
}
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Input department name:'
        }
    ]).then(department => {
        connection.query(
            'INSERT INTO department(name) VALUES (?)',
            department.name,
            function (err, result) {
                if (err) throw err;
                console.log(`\nInserted ${department.name} into department table!`)
                init();
            }
        )
    })
    
}

async function viewManager() {
    // get all manager names
    const results = [];

    connection.query(
        `SELECT *
        FROM employee
        WHERE manager_id is null;`,
        function (err, result) {
            if (err) throw err;
            result.forEach(element => {
                results.push(element.first_name +' '+ element.last_name)
            });

            // prompt user with manager names
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'manager',
                    message: "Which manager's team would you like to view?",
                    choices: results,
                }
            ]).then(answer => {
                console.log(answer.manager)
            })
        }
    )
    
    
}
function viewEmployees() {
    const results = [];
    connection.query(
        `SELECT 
            employee.id,  
            employee.first_name AS "first name", 
            employee.last_name AS "last name", 
            role.title AS position, 
            role.salary,
            department.name AS department
        FROM employee 
        INNER JOIN role ON (role.id = employee.role_id)
        INNER JOIN department ON (role.department_id = department.id)
        ORDER BY employee.id;`,
        function (err, result) {
            result.forEach(element => {
                results.push(element)
            });
            console.log("")
            console.table(results);
            init();
        }
    )
}
function viewRoles() {
    const results = [];
    connection.query(
        `SELECT 
            role.id, 
            role.title AS role, 
            role.salary,
            department.name AS department
        FROM role 
        INNER JOIN department ON (role.department_id = department.id)
        ORDER BY role.id;`,
        function (err, result) {
            result.forEach(element => {
                results.push(element)
            });
            console.log("");
            console.table(results);
            init();
        }
    )
}
function viewDepartments() {
    const results = [];
    connection.query(
        `SELECT DISTINCT
            id, 
            name AS department
        FROM department 
        ORDER BY id;`,
        function (err, result) {
            if (err) throw err;
            result.forEach(element => {
                results.push(element)
            });
            console.log("");
            console.table(results);
            init();
        }
    )
}

function viewAll() {
    const results = []
    connection.query(
        `SELECT
            employee.id,
            employee.first_name AS "first name", 
            employee.last_name AS "last name", 
            role.title AS position, 
            role.salary, 
            department.name AS department
        FROM employee 
        INNER JOIN role ON (role.id = employee.role_id)
        INNER JOIN department ON (role.department_id = department.id)
        ORDER BY department;`,
        function (err, result) {
            result.forEach(element => {
                results.push(element)
            });
            console.table(results);
            init();
        }
    )
}