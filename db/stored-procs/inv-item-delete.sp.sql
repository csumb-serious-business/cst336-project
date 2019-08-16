-- stored procedure --
USE serious_cst336;
-- create/recreate the stored procedure
DROP PROCEDURE IF EXISTS inv_item_delete;
DELIMITER $$
CREATE PROCEDURE inv_item_delete(IN _iid INT)
BEGIN
    -- remove the inventory item
    DELETE IGNORE FROM `inventory`
    WHERE `id` = _iid;

    -- delete all orphaned items
    DELETE IGNORE
    FROM `masterpiece`
    WHERE `id` NOT IN (
        SELECT DISTINCT i.`masterpiece_id`
        FROM `inventory` i
    );

    DELETE IGNORE
    FROM `artist`
    WHERE `id` NOT IN (
        SELECT DISTINCT m.`artist_id`
        FROM `masterpiece` m
    );

    DELETE IGNORE
    FROM `materials`
    WHERE `id` NOT IN (
        SELECT DISTINCT m.`materials_id`
        FROM `masterpiece` m
    );

    DELETE IGNORE
    FROM `type`
    WHERE `id` NOT IN (
        SELECT DISTINCT m.`type_id`
        FROM `masterpiece` m
    );

END $$
DELIMITER ;