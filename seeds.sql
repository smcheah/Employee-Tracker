USE employees_db;

INSERT INTO department (name)
	VALUES 
		("Research and Development"), 
		("Marketing"); 
		-- ("Customer Support"), 
		-- ("HR");
	
INSERT INTO role (title, salary, department_id)
	VALUES 
		("Software Developer", 80000, 1), 
		("Applications Manager", 150000, 1), 
		("QA Tester", 60000, 1), 
		("Software Architect", 90000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES 
		("George", "Brown", 2, NULL), 
		("Martha", "Newworth", 1, 1),
		("Aisha", "Fitzpatrick", 1, 1),
		("James", "Simon", 1, 1),
		("Major", "Stephens", 1, 1),
		("Carlton", "Kaufman", 3, 1),
		("Nicolas", "House", 3, 1),
		("Quentin", "Hodges", 3, 1),
		("Huey", "Chen", 4, 1);