USE employees_db;

INSERT INTO department (name)
	VALUES ("Research and Development"), ("Marketing"), ("Customer Support"), ("HR");
	
INSERT INTO role (title, salary, department_id)
	VALUES ("Software Developer", 80000, 1), ("Applications Manager", 150000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ("George", "Brown", 1, 2), ("Martha", "Newworth", 2, NULL);