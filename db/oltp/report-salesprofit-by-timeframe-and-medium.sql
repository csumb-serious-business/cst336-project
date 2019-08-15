SELECT sale_price-requisition_price AS sales_profit, year, name
FROM inventory 
	INNER JOIN masterpiece
		ON inventory.masterpiece_id=masterpiece.id
    INNER JOIN materials
		ON masterpiece.materials_id=materials.id
GROUP BY name
ORDER BY year, sales_profit ASC;