# MySQL -- prepared statement
# inserts an item into temp_art
INSERT INTO temp_art (`title`, `type`, `materials`, `artist`, `value`, `year`, `pic_src`)
VALUES (?, ?, ?, ?, ?, ?, ?)
