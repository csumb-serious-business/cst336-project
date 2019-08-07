# MySQL -- prepared statement
# inserts an item into temp_art
INSERT INTO temp_art (`title`, `medium`, `artist`, `value`)
VALUES (?, ?, ?, ?)
