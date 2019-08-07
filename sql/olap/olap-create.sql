# MySQL
DROP DATABASE IF EXISTS cst336_project;
CREATE DATABASE cst336_project;

USE cst336_project;

-- dimensions -- structurally different from oltp versions
CREATE TABLE masterpiece
(
    `id`     INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title`  VARCHAR(250) NOT NULL,
    `medium` VARCHAR(100) NOT NULL,
    `artist` VARCHAR(100) NOT NULL,
    `value`  VARCHAR(100) NOT NULL
);

CREATE TABLE inventory
(
    `id`                INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `masterpiece_id`    INT NOT NULL,
    `requisition_date`  INT NOT NULL,
    `requisition_price` INT NOT NULL,
    CONSTRAINT inventory_fk_masterpiece FOREIGN KEY (`masterpiece_id`)
        REFERENCES masterpiece (`id`)
);

CREATE TABLE sales
(
    `id`             INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `masterpiece_id` INT NOT NULL,
    `sale_price`     INT NOT NULL,
    CONSTRAINT inventory_fk_masterpiece FOREIGN KEY (`masterpiece_id`)
        REFERENCES masterpiece (`id`)
);
