SELECT sale_price-requisition_price AS sales_profit, year,name
FROM inventory 
	INNER JOIN masterpiece
		ON inventory.masterpiece_id=masterpiece.id
    INNER JOIN artist
		ON masterpiece.artist_id=artist.id
GROUP BY year
ORDER BY year, sales_profit ASC;