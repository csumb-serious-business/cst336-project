 SELECT value, name
	FROM masterpiece INNER JOIN artist
	ON masterpiece.artist_id=artist.id
GROUP BY name
ORDER BY value ASC;
