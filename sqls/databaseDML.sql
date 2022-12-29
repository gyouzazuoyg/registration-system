-- SQLBook: Code
set @@foreign_key_checks=OFF;

-- Campus
INSERT INTO Campuses(campus_name, city, state, country) VALUES ('Silicon Valley', 'San Jose', 'California', 'United States');
INSERT INTO Campuses(campus_name, city, state, country) VALUES ('San Francisco', 'San Francisco', 'California', 'United States');
INSERT INTO Campuses(campus_name, city, state, country) VALUES ('Seattle', 'Seattle', 'Washington', 'United States');
INSERT INTO Campuses(campus_name, city, state, country) VALUES ('Oakland', 'Oakland', 'California', 'United States');
INSERT INTO Campuses(campus_name, city, state, country) VALUES ('Boston', 'Boston', 'Massachusetts', 'United States');
INSERT INTO Campuses(campus_name, city, state, country) VALUES ('Vancouver', 'Vancouver', 'British Columbia', 'Canada');
INSERT INTO Campuses(campus_name, city, state, country) VALUES ('Portland', 'Portland', 'Oregon', 'United States');

-- Advisor
INSERT INTO Users(user_name, user_password, first_name, last_name, email, mobile, role_type, department, advisor, campus, college, required_credits, accquired_credits, time_ticket_from, time_ticket_to, office_hour)
VALUES ('Jennifer Pope', 'test', 'Jennifer', 'Pope', 'jennifer_pope@northeastern.edu', '111111111', 'advisor', 'Computer Science', NULL, 'Silicon Valley', 'Khoury College', NULL, NULL, NULL, NULL, 'Mon 9-10 PT AM');
INSERT INTO Users(user_name, user_password, first_name, last_name, email, mobile, role_type, department, advisor, campus, college, required_credits, accquired_credits, time_ticket_from, time_ticket_to, office_hour)
VALUES ('Cedric Hardy', 'test', 'Cedric', 'Hardy', 'cedric_hardy@northeastern.edu', '222222222', 'advisor', 'Architecture', NULL, 'Silicon Valley', 'School of Architecture', NULL, NULL, NULL, NULL, 'Tue 10-11 PT AM');

-- Student
INSERT INTO Users(user_name, user_password, first_name, last_name, email, mobile, role_type, department, advisor, campus, college, required_credits, accquired_credits, time_ticket_from, time_ticket_to, office_hour)
VALUES ('Monica Hao', 'test', 'Monica', 'Hao', 'haoyx@northeastern.edu', '333333333', 'student', 'Entrepreneurship', 254743453, 'Boston', 'School of Technological Entrepreneurship', 36, 20, '2022-11-20 14:45:00', '2022-11-30 14:45:00', NULL);
INSERT INTO Users(user_name, user_password, first_name, last_name, email, mobile, role_type, department, advisor, campus, college, required_credits, accquired_credits, time_ticket_from, time_ticket_to, office_hour)
VALUES ('Crystal Lee', 'test', 'Crystal', 'Lee', 'crystali@northeastern.edu', '444444444', 'student', 'Department of Electrical and Computer Engineering', 295427804, 'Boston', NULL, 40, 24, '2022-11-23 14:45:00', '2022-11-30 14:45:00', NULL);
INSERT INTO Users(user_name, user_password, first_name, last_name, email, mobile, role_type, department, advisor, campus, college, required_credits, accquired_credits, time_ticket_from, time_ticket_to, office_hour)
VALUES ('student', '1', 'Crystal', 'Lee', 'student@northeastern.edu', '444444444', 'student', 'Department of Electrical and Computer Engineering', 295427804, 'Boston', NULL, 40, 24, '2022-11-23 14:45:00', '2022-11-30 14:45:00', NULL);

-- Admin
INSERT INTO Users(user_name, user_password, first_name, last_name, email, mobile, role_type, department, advisor, campus, college, required_credits, accquired_credits, time_ticket_from, time_ticket_to, office_hour)
VALUES ('Admin1', 'test', 'Admin1FirstName', 'Admin2LastName', 'abc@northeastern.edu', '555555555', 'admin', 'Administration', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'a');
INSERT INTO Users(user_name, user_password, first_name, last_name, email, mobile, role_type, department, advisor, campus, college, required_credits, accquired_credits, time_ticket_from, time_ticket_to, office_hour)
VALUES ('Admin2', 'test', 'Admin1FirstName', 'Admin2LastName', 'qwe@northeastern.edu', '666666666', 'admin', 'Administration', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'b');

-- StudentRegisteredCourses
INSERT INTO StudentRegisteredCourses(student_id, CRN, date) VALUES (5, 100000001, '2022-12-06 12:00:00');
INSERT INTO StudentRegisteredCourses(student_id, CRN, date) VALUES (5, 100000002, '2022-12-06 12:00:00');

-- StudentWaitlistedCourses
INSERT INTO StudentWaitlistedCourses(student_id, CRN, date) VALUES (5, 234567899, '2022-12-06 12:00:00');
INSERT INTO StudentWaitlistedCourses(student_id, CRN, date) VALUES (5, 414546185, '2022-12-06 12:00:00');

-- INSERT INTO Users(user_id, user_name, email, department) VALUES (222222222,'Gregory D. Abowd','gregory@northeastern.edu',NULL);
-- INSERT INTO Users(user_id, user_name, email, department) VALUES (333333333,'Emery Trahan','emery@northeastern.edu',NULL);
-- INSERT INTO Users(user_id, user_name, email, department) VALUES (444444444,'Carmen C. Sceppa','carmen@northeastern.edu',NULL);
-- INSERT INTO Users(user_id, user_name, email, department) VALUES (555555555,'James Hackney','james@northeastern.edu',NULL);
-- INSERT INTO Users(user_id, user_name, email, department) VALUES (666666666,'Jonathan Kaufman','jonathan@northeastern.edu',NULL);
-- INSERT INTO Users(user_id, user_name, email, department) VALUES (777777777,'Elizabeth Hudson','elizabeth@northeastern.edu',NULL);

-- College
INSERT INTO Colleges(college_name, campus, dean) VALUES('Khoury College of Computer Sciences', 'Silicon Valley', 111111111);
INSERT INTO Colleges(college_name, campus, dean) VALUES('College of Engineering', 'Boston', 222222222);
INSERT INTO Colleges(college_name, campus, dean) VALUES('DAmore-McKim School of Business', 'Boston', 333333333);
INSERT INTO Colleges(college_name, campus, dean) VALUES('Bouvé College of Health Sciences', 'Boston', 444444444);
INSERT INTO Colleges(college_name, campus, dean) VALUES('School of Law', 'Boston', 555555555);
INSERT INTO Colleges(college_name, campus, dean) VALUES('School of Journalism', 'Boston', 666666666);
INSERT INTO Colleges(college_name, campus, dean) VALUES('College of Arts, Media and Design', 'Boston', 777777777);

-- Department
INSERT INTO Departments(department_name, department_chair, college) VALUES('Computer Science', 111111113, 'Khoury College of Computer Sciences');
INSERT INTO Departments(department_name, department_chair, college) VALUES('School of Architecture', 222222223, 'College of Arts, Media and Design');
INSERT INTO Departments(department_name, department_chair, college) VALUES('School of Technological Entrepreneurship', 333333334, 'DAmore-McKim School of Business');
INSERT INTO Departments(department_name, department_chair, college) VALUES('Department of Electrical and Computer Engineering', 444444443, 'College of Engineering');
INSERT INTO Departments(department_name, department_chair, college) VALUES('Department of Applied Psychology', 555555553, 'Bouvé College of Health Sciences');
INSERT INTO Departments(department_name, department_chair, college) VALUES('Journalism', 666666663, 'School of Journalism');
INSERT INTO Departments(department_name, department_chair, college) VALUES('Law', 777777773, 'School of Law');
INSERT INTO Departments(department_name, department_chair, college) VALUES('Administration', 111223344, NULL);

-- Department_Chair
-- INSERT INTO Users (user_id, user_name, email, department) VALUES (111111113,'Tom Woods','tom@northeastern.edu','Computer Science');
-- INSERT INTO Users (user_id, user_name, email, department) VALUES (222222223,'Jack Muhammad','jack@northeastern.edu','School of Architecture');
-- INSERT INTO Users (user_id, user_name, email, department) VALUES (333333334,'Jake Hassan','jake@northeastern.edu','School of Technological Entrepreneurship');
-- INSERT INTO Users (user_id, user_name, email, department) VALUES (444444443,'Tyrell Roger','tyrell@northeastern.edu','Department of Electrical and Computer Engineering');
-- INSERT INTO Users (user_id, user_name, email, department) VALUES (555555553,'Jason Ayala','jason@northeastern.edu','Department of Applied Psychology');
-- INSERT INTO Users (user_id, user_name, email, department) VALUES (666666663,'Justin Wood','justin@northeastern.edu','Journalism');
-- INSERT INTO Users (user_id, user_name, email, department) VALUES (777777773,'Tevin Fields','tevin@northeastern.edu','Law');

-- Advisors
-- INSERT INTO Advisors(user_id, user_name, email, department, office_hour) VALUES(275662221, 'Jennifer Pope', 'jennifer_pope@northeastern.edu', 'Computer Science', 'Mon 9-10 PT AM');
-- INSERT INTO Advisors(user_id, user_name, email, department, office_hour) VALUES(254662362, 'Cedric Hardy', 'cedric_hardy@northeastern.edu', 'School of Architecture', 'Tue 10-11 PT AM');
-- INSERT INTO Advisors(user_id, user_name, email, department, office_hour) VALUES(254743453, 'Shaun Medina', 'shaun_medina@northeastern.edu', 'School of Technological Entrepreneurship', 'Wed 10-11 PT AM');
-- INSERT INTO Advisors(user_id, user_name, email, department, office_hour) VALUES(295427804, 'Jade Brooks', 'jade_brooks@northeastern.edu', 'Department of Electrical and Computer Engineering', 'Thu 5-6 PT PM');
-- INSERT INTO Advisors(user_id, user_name, email, department, office_hour) VALUES(204575455, 'Dane Hum', 'dane_hum@northeastern.edu', 'Department of Applied Psychology', 'Fri 3-4 PT PM');
-- INSERT INTO Advisors(user_id, user_name, email, department, office_hour) VALUES(209504566, 'Peter Harris', 'peter_harris@northeastern.edu', 'Journalism', 'Sat 1-2 PT PM');
-- INSERT INTO Advisors(user_id, user_name, email, department, office_hour) VALUES(289656877, 'Simona Savage', 'simona_savage@northeastern.edu', 'Law', 'Sun 7-8 PT PM');

-- Students
-- INSERT INTO Students(user_id, user_name, email, campus, department, advisor, required_credits, accquired_credits, time_ticket) VALUES(197121110, 'Monica Hao', 'haoyx@northeastern.edu', 'Boston', 'School of Technological Entrepreneurship', 254743453, 36, 20, '2022-11-20 14:45:00');
-- INSERT INTO Students(user_id, user_name, email, campus, department, advisor, required_credits, accquired_credits, time_ticket) VALUES(199712119, 'Crystal Lee', 'crystali@northeastern.edu', 'Boston', 'Department of Electrical and Computer Engineering', 295427804, 40, 24, '2022-11-23 14:45:00');
-- INSERT INTO Students(user_id, user_name, email, campus, department, advisor, required_credits, accquired_credits, time_ticket) VALUES(575662221, 'Simon Welch', 'simon_welch@northeastern.edu', 'Silicon Valley', 'Computer Science', 275662221, 32, 16, '2022-11-20 14:45:00');
-- INSERT INTO Students(user_id, user_name, email, campus, department, advisor, required_credits, accquired_credits, time_ticket) VALUES(575662220, 'Danny Pierce', 'danny_pierce@northeastern.edu', 'Boston', 'School of Architecture', 254662362, 40, 32, '2022-11-25 14:45:00');
-- INSERT INTO Students(user_id, user_name, email, campus, department, advisor, required_credits, accquired_credits, time_ticket) VALUES(112233401, 'Jason Zhang', 'jason@northeastern.edu', 'Boston', 'Department of Applied Psychology', 204585455, 32, 4, '2022-10-01-10-00-00');
-- INSERT INTO Students(user_id, user_name, email, campus, department, advisor, required_credits, accquired_credits, time_ticket) VALUES(112234402, 'Jake Wang', 'jake@northeastern.edu', 'Boston', 'Journalism', 209504566, 36, 20, '2022-11-01-10-00-00');
-- INSERT INTO Students(user_id, user_name, email, campus, department, advisor, required_credits, accquired_credits, time_ticket) VALUES(666666661, 'Vincent Li', 'li.guo@northeastern.edu', 'Boston', 'Law', 289656877, 40, 8, '2022-11-20 05:00:00');
-- INSERT INTO Students(user_id, user_name, email, campus, department, advisor, required_credits, accquired_credits, time_ticket) VALUES(888888888, 'Peter Li', 'li.peterw@northeastern.edu', 'Boston', 'Law', 289656877, 40, 12, '2022-11-22 05:00:00');

-- Admins
-- INSERT INTO Admins (user_name, user_id, email, department, description) VALUES ('Admin1', 111223344, 'abc@northeastern.edu', 'Administration', 'a');
-- INSERT INTO Admins (user_name, user_id, email, department, description) VALUES ('Admin2', 111223345, 'qwe@northeastern.edu', 'Administration', 'a');
-- INSERT INTO Admins (user_name, user_id, email, department, description) VALUES ('Admin3', 111223346, 'asd@northeastern.edu', 'Administration', 'a');
-- INSERT INTO Admins (user_name, user_id, email, department, description) VALUES ('Admin4', 111223347, 'zxc@northeastern.edu', 'Administration', 'a');
-- INSERT INTO Admins (user_name, user_id, email, department, description) VALUES ('Admin5', 111223348, 'qaz@northeastern.edu', 'Administration', 'a');
-- INSERT INTO Admins (user_name, user_id, email, department, description) VALUES ('Admin6', 111223349, 'wsx@northeastern.edu', 'Administration', 'a');
-- INSERT INTO Admins (user_name, user_id, email, department, description) VALUES ('Admin7', 111223350, 'edc@northeastern.edu', 'Administration', 'a');

-- Courses
INSERT INTO Courses (CRN, course_id, course_name, credits, professor, course_description, prerequisites, classroom, building, campus, department, college, term, schedule, course_capacity, waitlist_capacity, posted_by, created_by)
VALUES (112, 'CS 5200', 'Database Management', 4, 'Professor Lee', 'This is a very good course.', 'CS 5001', '102', 'B', 'Silicon Valley', 'Computer Science', 'Khoury College', 'Fall 2023', 'Tuesday', 60, 20, '2', '20221105');
INSERT INTO Courses (CRN, course_id, course_name, credits, professor, course_description, prerequisites, classroom, building, campus, department, college, term, schedule, course_capacity, waitlist_capacity, posted_by, created_by)
VALUES (113, 'CS 5610', 'Web Development', 4, 'Professor Good', 'This is a very good course.', 'CS 5004', '103', 'A', 'Seattle', 'Computer Science', 'Khoury College', 'Fall 2023', 'Monday', 0, 20, '2', '20221108');

-- INSERT INTO Courses (CRN, course_id, course_name, credits, course_description, college, department, semester, course_capacity, waitlist_capacity) VALUES(100000003, 'LAW 101', 'Intro to American Law', 4, 'This course will give you a glimpse into six different areas of American law: Tort Law, Contract Law, Property, Constitutional Law, Criminal Law, and Civil Procedure. You will gain insight into the complexities and dilemmas that arise from the application of law in different settings, and what is distinctive about American approaches.', 'School of Law', 'Law', 'Spring 2023', 40, 40, 0, 0);
-- INSERT INTO Courses (CRN, course_id, course_name, credits, course_description, college, department, semester, course_capacity, waitlist_capacity) VALUES(100000004, 'LAW 201', 'Introduction to International Criminal Law', 4, 'From the Nuremberg trial to the case against Saddam Hussein, from the prosecution of Al-Qaeda terrorists to the trial of Somali pirates – no area of law is as important to world peace and security as international criminal law.  Taught by one of the world’s leading experts in the field, this course will educate students about the fundamentals of international criminal law and policy.  We will explore the contours of international crimes such as genocide, war crimes, terrorism, and piracy.  We will examine unique modes of international criminal liability and specialized defenses.  And we will delve into the challenges of obtaining custody of the accused and maintaining control of the courtroom.', 'School of Law', 'Law', 'Spring 2023', 30, 30, 0, 0);
-- INSERT INTO Courses (CRN, course_id, course_name, credits, course_description, college, department, semester, course_capacity, waitlist_capacity) VALUES(234567890, 'AP 101', 'Social Psychology', 4, 'The branch of psychology that deals with social interactions, including their origins and their effects on the individual.', 'Bouvé College of Health Sciences', 'Department of Applied Psychology', 'Spring 2022',100, 20, 0, 0);
-- INSERT INTO Courses (CRN, course_id, course_name, credits, course_description, college, department, semester, course_capacity, waitlist_capacity) VALUES(234567899, 'JN 101', 'Communication', 4, 'A communications degree is a great way to prepare yourself for a career in fields ranging from media relations and journalism to marketing, corporate communications and many more.', 'School of Journalism', 'Journalism', 'Fall 2022',120, 25, 0, 0);
-- INSERT INTO Courses (CRN, course_id, course_name, credits, course_description, college, department, semester, course_capacity, waitlist_capacity) VALUES(414546185, 'CS 5200', 'Data Mining', 4, 'In this course, students will learn basic concepts and tools for data mining, including data sources, data cleaning tools and methods, mainstream algorithms for data mining, statistical modeling, popular tools for mining structured data and unstructured data.','Khoury College of Computer Sciences', 'Computer Science', 'Fall 2022', 50, 20, 50, 0);
-- INSERT INTO Courses (CRN, course_id, course_name, credits, course_description, college, department, semester, course_capacity, waitlist_capacity) VALUES(312442185, 'AR 5200', 'Architectural Visualization', 4, 'This course teaches what architectural visualization is, how it can give new ideas for constructing and marketing designs and buildings, and benefits companies.','College of Arts, Media and Design', 'School of Architecture', 'Fall 2022', 40, 15, 40, 0);
-- INSERT INTO Courses (CRN, course_id, course_name, credits, course_description, college, department, semester, course_capacity, waitlist_capacity) VALUES(100000002, 'EN 101', 'Intro to Entrepreneurship', 4, 'Intro to technical entrepreneurship.', 'DAmore-McKim School of Business', 'School of Technological Entrepreneurship', 'Fall 2023', 40, 20, 0, 0);
-- INSERT INTO Courses (CRN, course_id, course_name, credits, course_description, college, department, semester, course_capacity, waitlist_capacity) VALUES(100000001, 'EE 102', 'Foundation of Engineering', 4, 'Intro to Engineering', 'College of Engineering', 'Department of Electrical and Computer Engineering', 'Fall 2023', 50, 10, 0, 0);

set @@foreign_key_checks=ON;
