# MySQL
# setup temp table for csv load
USE serious_cst336;

DROP TABLE IF EXISTS temp_art;
CREATE TABLE temp_art
(
    `title`  VARCHAR(250) NOT NULL,
    `medium` VARCHAR(100) NOT NULL,
    `artist` VARCHAR(100) NOT NULL,
    `value`  INT          NOT NULL
);
