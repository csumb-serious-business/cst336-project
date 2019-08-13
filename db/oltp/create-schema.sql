# MySQL
# create/recreate the database
DROP DATABASE IF EXISTS serious_cst336;
CREATE DATABASE serious_cst336;

USE serious_cst336;

CREATE TABLE type
(
    `id`   INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL
);

CREATE TABLE materials
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
    `id`           INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title`        VARCHAR(250) NOT NULL,
    `type_id`      INT          NOT NULL,
    `materials_id` INT          NOT NULL,
    `artist_id`    INT          NOT NULL,
    `value`        INT          NOT NULL,
    `year`         VARCHAR(20)  NOT NULL,
    `pic_src`      VARCHAR(250) NOT NULL,
    CONSTRAINT masterpiece_fk_type FOREIGN KEY (`type_id`)
        REFERENCES type (`id`),
    CONSTRAINT masterpiece_fk_materials FOREIGN KEY (`materials_id`)
        REFERENCES materials (`id`),
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
