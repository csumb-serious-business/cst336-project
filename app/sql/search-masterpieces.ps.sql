SELECT *
FROM `inventory` i
         JOIN `masterpiece` m
              ON i.`masterpiece_id` = m.`id`
WHERE m.`title` LIKE ?
  AND m.`type_id` = ?
  AND m.`materials_id` = ?
  AND m.`artist_id` = ?
  AND i.`price` >= ?
  AND i.`price` <= ?
-- # todo add order by