# MySQL
DROP DATABASE IF EXISTS cst336_project;
CREATE DATABASE cst336_project;

USE cst336_project;

CREATE TABLE favorites
(
    `id`        INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `image_url` VARCHAR(250) NOT NULL,
    `keyword`   VARCHAR(25)  NOT NULL
);

