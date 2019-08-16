-- stored procedure --
-- create/recreate the stored procedure
DROP PROCEDURE IF EXISTS inv_item_create;
DELIMITER $$
CREATE PROCEDURE inv_item_create(IN _title VARCHAR(250),
                                 IN _type VARCHAR(100),
                                 IN _material VARCHAR(100),
                                 IN _artist VARCHAR(100),
                                 IN _year VARCHAR(20),
                                 IN _pic_src VARCHAR(250),
                                 IN _value INT,
                                 IN _req_price INT)
BEGIN
    INSERT IGNORE INTO `type` (`name`)
    VALUES (_type);

    INSERT IGNORE INTO `materials` (`name`)
    VALUES (_material);

    INSERT IGNORE INTO `artist` (`name`)
    VALUES (_artist);

    INSERT IGNORE INTO `masterpiece` (
        SELECT null        as `id`,
               _.`title`   as `title`,
               t.`id`      as `type_id`,
               m.`id`      as `materials_id`,
               a.`id`      as `artist_id`,
               _.`value`   as `value`,
               _.`year`    as `value`,
               _.`pic_src` as `value`
        FROM (SELECT _title    as `title`,
                     _type     as `type`,
                     _material as `materials`,
                     _artist   as `artist`,
                     _value    as `value`,
                     _year     as `year`,
                     _pic_src  as `pic_src`
             ) _
                 JOIN type t ON t.`name` = _.`type`
                 JOIN materials m ON m.`name` = _.`materials`
                 JOIN artist a ON a.`name` = _.`artist`
    );

    INSERT IGNORE INTO inventory(
        SELECT null                  as `id`,
               m.`id`                as `masterpiece_id`,
               CURDATE() - 7         as `requisition_date`,
               _req_price            as `requisition_price`,
               CEIL(m.`value` * 1.2) as `sale_price`,
               TRUE                  as `have`
        FROM masterpiece m
        WHERE m.`title` = _title
        LIMIT 1
    );
END $$
DELIMITER ;

-- test
-- CALL inv_item_create('hi', 'clothing', 'cotton', 'him', '1980', 'https://labs.mysql.com/common/themes/sakila/banners/b600-mysql-8-utf8mb4.en.jpg', '10000000', '120000');