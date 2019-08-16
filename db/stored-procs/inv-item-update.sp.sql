-- stored procedure --
USE serious_cst336;
-- create/recreate the stored procedure
DROP PROCEDURE IF EXISTS inv_item_update;
DELIMITER $$
CREATE PROCEDURE inv_item_update(IN _title VARCHAR(250),
                                 IN _type VARCHAR(100),
                                 IN _material VARCHAR(100),
                                 IN _artist VARCHAR(100),
                                 IN _year VARCHAR(20),
                                 IN _pic_src VARCHAR(250),
                                 IN _value INT,
                                 IN _req_price INT,
                                 IN _iid INT,
                                 IN _mid INT)
BEGIN
    -- try to insert values before they become unexpected failures
    INSERT IGNORE INTO `type` (`name`)
    VALUES (_type);

    INSERT IGNORE INTO `materials` (`name`)
    VALUES (_material);

    INSERT IGNORE INTO `artist` (`name`)
    VALUES (_artist);

    -- update masterpiece
    UPDATE IGNORE `masterpiece` m
    SET m.`title`        = _title,
        m.`type_id`      = (SELECT `id` FROM `type` t WHERE t.`name` = _type LIMIT 1),
        m.`materials_id` = (SELECT `id` FROM `materials` mt WHERE mt.`name` = _material LIMIT 1),
        m.`artist_id`       = (SELECT `id` FROM `artist` a WHERE a.`name` = _artist LIMIT 1),
        m.`value`        = _value,
        m.`year`         = _year,
        m.`pic_src`      = _pic_src
    WHERE m.`id` = _mid;

    UPDATE IGNORE `inventory` i
    SET i.`requisition_price` = _req_price,
        i.`sale_price`        = _value * 1.2
    WHERE i.`id` = _iid;
END $$
DELIMITER ;