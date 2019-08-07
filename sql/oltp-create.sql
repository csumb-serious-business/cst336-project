# MySQL
# create/recreate the database
DROP DATABASE IF EXISTS serious_cst336;
CREATE DATABASE serious_cst336;

USE serious_cst336;

CREATE TABLE medium
(
    `id`   INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL
);

CREATE TABLE artist
(
    `id`   INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL
);

CREATE TABLE masterpiece
(
    `id`        INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title`     VARCHAR(250) NOT NULL,
    `medium_id` INT          NOT NULL,
    `artist_id` INT          NOT NULL,
    `value`     INT          NOT NULL,
    CONSTRAINT masterpiece_fk_medium FOREIGN KEY (`medium_id`)
        REFERENCES medium (`id`),
    CONSTRAINT masterpiece_fk_artist FOREIGN KEY (`artist_id`)
        REFERENCES artist (`id`)
);

CREATE TABLE inventory
(
    `id`                INT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `masterpiece_id`    INT  NOT NULL,
    `requisition_date`  DATE NOT NULL,
    `requisition_price` INT  NOT NULL,
    `sale_price`        INT  NOT NULL,
    `have`              BOOL NOT NULL,
    CONSTRAINT inventory_fk_masterpiece FOREIGN KEY (`masterpiece_id`)
        REFERENCES masterpiece (`id`)
);

CREATE TABLE sales
(
    `id`           INT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `inventory_id` INT  NOT NULL,
    `sale_date`    DATE NOT NULL,
    CONSTRAINT sales_fk_inventory FOREIGN KEY (`inventory_id`)
        REFERENCES inventory (`id`)
);
