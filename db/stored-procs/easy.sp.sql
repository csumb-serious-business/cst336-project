-- stored procedure --
-- create/recreate the stored procedure
DROP PROCEDURE IF EXISTS easy;
DELIMITER $$
CREATE PROCEDURE easy(IN _limit INT)
BEGIN
    SELECT i.id         as iid,
           m.id         as mid,
           m.title      as title,
           ar.name      as artist,
           m.year       as year,
           ty.name      as type,
           ma.name      as materials,
           i.sale_price as price,
           m.pic_src    as pic_src

    FROM `inventory` i
             JOIN `masterpiece` m ON i.`masterpiece_id` = m.`id`
             JOIN `type` ty ON ty.`id` = m.`type_id`
             JOIN `materials` ma ON ma.`id` = m.`materials_id`
             JOIN `artist` ar ON ar.`id` = m.`artist_id`
    WHERE i.have = TRUE
    LIMIT _limit;
END $$
DELIMITER ;
-- todo all where clauses need to be wrapped in if else true