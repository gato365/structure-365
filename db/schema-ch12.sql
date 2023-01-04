DROP DATABASE IF EXISTS company_db;
-- Creates the "company_db" database --
CREATE DATABASE company_db;
USE company_db;


-- Departments Table --
CREATE TABLE department (
    id               INT      NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name             VARCHAR(30) 
);


-- Roles Table --
CREATE TABLE role (
    id              INT       NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title           VARCHAR(30),
    salary          DECIMAL,
    department_id   INT--,
    -- FOREIGN KEY (id) REFERENCES department(id) ON DELETE SET NULL
);

-- Employees Table --
CREATE TABLE employee (
    id              INT        NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name      VARCHAR(30),
    last_name       VARCHAR(30),
    role_id         INT,
    manager_id      INT--,
    -- FOREIGN KEY (id) REFERENCES role(id) ON DELETE SET NULL
);



