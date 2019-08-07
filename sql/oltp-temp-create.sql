# MySQL
# setup temp table for csv load
DROP TABLE IF EXISTS temp_artwork;
CREATE TABLE temp_artwork
(
    `title`  VARCHAR(250) NOT NULL,
    `medium` VARCHAR(100) NOT NULL,
    `artist` VARCHAR(100) NOT NULL,
    `value`  INT          NOT NULL
);
