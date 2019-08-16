-- stored procedure --
-- create/recreate the stored procedure
DROP PROCEDURE IF EXISTS search_masterpieces;
DELIMITER $$
CREATE PROCEDURE search_masterpieces(IN _title VARCHAR(250),
                                     IN _type INT,
                                     IN _material INT,
                                     IN _artist INT,
                                     IN _price_min INT,
                                     IN _price_max INT,
                                     IN _limit INT)
BEGIN
    SELECT i.id                                 as iid,
           -- m.id         as mid,
           m.pic_src                            as piece,
           m.title                              as title,
           ar.name                              as artist,
           m.year                               as year,
           ty.name                              as type,
           ma.name                              as materials,
           CONCAT('$', FORMAT(i.sale_price, 2)) as price

    FROM `inventory` i
             JOIN `masterpiece` m ON i.`masterpiece_id` = m.`id`
             JOIN `type` ty ON ty.`id` = m.`type_id`
             JOIN `materials` ma ON ma.`id` = m.`materials_id`
             JOIN `artist` ar ON ar.`id` = m.`artist_id`
    WHERE i.have = TRUE
      AND IF(_title <> "", m.`title` LIKE CONCAT('%', _title, '%'), TRUE)
      AND IF(_type <> "", m.`type_id` = _type, TRUE)
      AND IF(_material <> "", m.`materials_id` = _material, TRUE)
      AND IF(_artist <> "", m.`artist_id` = _artist, TRUE)
      AND IF(_price_min <> "", i.`sale_price` >= _price_min, TRUE)
      AND IF(_price_max <> "", i.`sale_price` <= _price_max, TRUE)
    ORDER BY title
    LIMIT _limit;
END $$
DELIMITER ;
