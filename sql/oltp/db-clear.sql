# MySQL
USE serious_cst336;

# clear all tables before loading
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE type;
TRUNCATE TABLE materials;
TRUNCATE TABLE artist;
TRUNCATE TABLE masterpiece;
TRUNCATE TABLE inventory;
TRUNCATE TABLE sales;
SET FOREIGN_KEY_CHECKS = 1;