-- prepared statement -- gets a masterpiece item's details
SELECT i.`id`                as `iid`,
       m.`id`                as `mid`,
       m.`title`             as `title`,
       ty.`name`             as `type`,
       ma.`name`             as `materials`,
       ar.`name`             as `artist`,
       m.`year`              as `year`,
       m.`pic_src`           as `pic_src`,
       m.`value`             as `value`,
       i.`requisition_price` as `requisition_price`
FROM `inventory` i
         JOIN `masterpiece` m ON i.`masterpiece_id` = m.`id`
         JOIN `type` ty ON ty.`id` = m.`type_id`
         JOIN `materials` ma ON ma.`id` = m.`materials_id`
         JOIN `artist` ar ON ar.`id` = m.`artist_id`
WHERE i.`id` = ?
# todo add more details (see search for example)
# todo add artist image