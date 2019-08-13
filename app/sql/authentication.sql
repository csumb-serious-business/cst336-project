DROP SCHEMA IF EXISTS `authentication`;
CREATE SCHEMA `authentication`;

DROP TABLE IF EXISTS `authentication`.`users`; 
CREATE TABLE `authentication`.`users`(
	userID int(11) AUTO_INCREMENT,
    PRIMARY KEY (userID),
	username varchar(8),
	password varchar(72));

INSERT INTO `authentication`.`users` VALUES(1,'admin','$2a$05$r2tnsPeQXP/yWuh7.Mz3MO3zkUAposLywMXrsQ1EFZpf2ecvzw6mm');
SELECT * FROM `authentication`.`users`;


