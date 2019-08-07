# MySQL
USE serious_cst336;

# clear all tables before loading
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE medium;
TRUNCATE TABLE artist;
TRUNCATE TABLE masterpiece;
TRUNCATE TABLE inventory;
SET FOREIGN_KEY_CHECKS = 1;



# csv -> temp
LOAD DATA LOCAL INFILE 'sql/data/artwork.csv' INTO TABLE temp_artwork
    FIELDS TERMINATED BY ','
    ENCLOSED BY '"'
    LINES TERMINATED BY '\r\n'
    IGNORE 1 LINES
;

# temp -> medium
INSERT INTO medium (
    SELECT DISTINCT null     as `id`,
                    `medium` as `name`
    FROM temp_artwork
);


# # temp -> artist
# INSERT IGNORE INTO artist (
#     SELECT DISTINCT `artist` as `name`
#     FROM temp_artwork
# );


# temp -> masterpiece
# INSERT IGNORE INTO masterpiece (
#     SELECT null      as `id`,
#            t.`title` as `title`,
#            m.`id`    as `medium_id`,
#            a.`id`    as `artist_id`,
#            t.`value` as `value`
#     FROM (SELECT DISTINCT `title`, `medium`, `artist`, `value` FROM temp_artwork) t
#              JOIN medium m ON m.`name` = t.`medium`
#              JOIN artist a ON a.`name` = t.`artist`
# );

# temp -> inventory
# INSERT IGNORE INTO inventory(
#     SELECT null                   as `id`,
#            m.`id`                 as `masterpiece_id`,
#            CURDATE() - 7          as `requisition_date`,
#            FLOOR(m.`value` * .85) as `requisition_price`,
#            CEIL(m.`value` * 1.2)  as `sale_price`,
#            TRUE                   as `have`
#     FROM masterpiece m
# );


# DROP TABLE IF EXISTS temp_artwork;