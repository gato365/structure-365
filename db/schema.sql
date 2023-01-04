DROP DATABASE IF EXISTS structure_db;
CREATE DATABASE structure_db;

USE structure_db;

-- Initial Survey

CREATE TABLE user (
    userid INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL,
    username VARCHAR(30) NOT NULL,
    PRIMARY KEY(userid)
);



-- Exercise Table
CREATE TABLE exercise (
    muscle_group VARCHAR(50) NOT NULL,
    exercise VARCHAR(20) NOT NULL 
);


-- Workout Table
CREATE TABLE workout (
    id INT AUTO_INCREMENT NOT NULL,
    userid INT NOT NULL,
    muscle_group VARCHAR(50) NOT NULL,
    date DATETIME,
    exercise VARCHAR(20) NOT NULL,
    weight INT,
    number_of_sets INT,
    number_of_reps INT,
    PRIMARY KEY (id)
);


-- Foreign Key Issues
-- FOREIGN KEY (muscle_group) REFERENCES exercise(muscle_group)
-- FOREIGN KEY (userid) REFERENCES user(userid)

-- Survey