SELECT value, name
	FROM masterpiece INNER JOIN materials
	ON masterpiece.materials_id=materials.id
GROUP BY name
ORDER BY value ASC