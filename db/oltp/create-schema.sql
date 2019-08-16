# MySQL
# create and clear all tables
SET FOREIGN_KEY_CHECKS = 0;
CREATE TABLE IF NOT EXISTS `type`
(
    `id`   INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL
);

TRUNCATE TABLE `type`;

CREATE TABLE IF NOT EXISTS `materials`
(
    `id`   INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL

);

TRUNCATE TABLE `materials`;

CREATE TABLE IF NOT EXISTS `artist`
(
    `id`   INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL
);

TRUNCATE TABLE `artist`;

CREATE TABLE IF NOT EXISTS `masterpiece`
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

TRUNCATE `masterpiece`;

CREATE TABLE IF NOT EXISTS `inventory`
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

TRUNCATE `inventory`;

CREATE TABLE IF NOT EXISTS `sales`
(
    `id`           INT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `inventory_id` INT  NOT NULL,
    `sale_date`    DATE NOT NULL,
    CONSTRAINT sales_fk_inventory FOREIGN KEY (`inventory_id`)
        REFERENCES inventory (`id`)
);

TRUNCATE `sales`;

SET FOREIGN_KEY_CHECKS = 1;