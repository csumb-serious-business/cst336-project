# MySQL
# setup temp table for csv load
DROP TABLE IF EXISTS temp_art;
CREATE TABLE temp_art
(
    `title`     VARCHAR(250) NOT NULL,
    `type`      VARCHAR(100) NOT NULL,
    `materials` VARCHAR(100) NOT NULL,
    `artist`    VARCHAR(100) NOT NULL,
    `value`     INT          NOT NULL,
    `year`      VARCHAR(20)  NOT NULL,
    `pic_src`   VARCHAR(250) NOT NULL
);

