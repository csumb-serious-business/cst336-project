-- query --
SELECT a.`name`,
       CONCAT('$', FORMAT(SUM(i.`sale_price`), 2))                   as `sale_value`,
       CONCAT('$', FORMAT(SUM(i.`requisition_price`), 2))            as `cost`,
       CONCAT('$', FORMAT(
                   SUM(i.`sale_price`) - SUM(i.`requisition_price`), 2)) as `projected_profit`
FROM `inventory` i
         JOIN `masterpiece` m ON m.`id` = i.`masterpiece_id`
         JOIN `artist` a ON a.`id` = m.`artist_id`
GROUP BY a.`name` WITH ROLLUP;