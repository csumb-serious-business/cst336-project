-- prepared statement -- gets a masterpiece item's details
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
WHERE i.`id` = ?
# todo add more details (see search for example)
# todo add artist image