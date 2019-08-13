# MySQL
USE serious_cst336;

# clear all tables before loading
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE type;
TRUNCATE TABLE materials;
TRUNCATE TABLE artist;
TRUNCATE TABLE masterpiece;
TRUNCATE TABLE inventory;
SET FOREIGN_KEY_CHECKS = 1;

# temp -> type
INSERT IGNORE INTO type (`name`)(
    SELECT DISTINCT `type`
    FROM temp_art
);

# temp -> materials
INSERT IGNORE INTO materials (`name`)(
    SELECT DISTINCT `materials`
    FROM temp_art
);

# # temp -> artist
INSERT IGNORE INTO artist (`name`)(
    SELECT DISTINCT `artist`
    FROM temp_art
);

# temp -> masterpiece
INSERT IGNORE INTO masterpiece (
    SELECT null        as `id`,
           _.`title`   as `title`,
           t.`id`      as `type_id`,
           m.`id`      as `materials_id`,
           a.`id`      as `artist_id`,
           _.`value`   as `value`,
           _.`year`    as `value`,
           _.`pic_src` as `value`
    FROM (SELECT DISTINCT `title`, `type`, `materials`, `artist`, `value`, `year`, `pic_src` FROM temp_art) _
             JOIN type t ON t.`name` = _.`type`
             JOIN materials m ON m.`name` = _.`materials`
             JOIN artist a ON a.`name` = _.`artist`
);

# temp -> inventory
INSERT IGNORE INTO inventory(
    SELECT null                   as `id`,
           m.`id`                 as `masterpiece_id`,
           CURDATE() - 7          as `requisition_date`,
           FLOOR(m.`value` * .85) as `requisition_price`,
           CEIL(m.`value` * 1.2)  as `sale_price`,
           TRUE                   as `have`
    FROM masterpiece m
);