# MySQL
# clear all tables before loading
SET FOREIGN_KEY_CHECKS = 0;
CREATE TABLE IF NOT EXISTS `type`;
TRUNCATE TABLE `type`;
CREATE TABLE IF NOT EXISTS `materials`;
TRUNCATE TABLE `materials`;
CREATE TABLE IF NOT EXISTS `artist`;
TRUNCATE TABLE `artist`;
CREATE TABLE IF NOT EXISTS `masterpiece`;
TRUNCATE TABLE `masterpiece`;
CREATE TABLE IF NOT EXISTS `inventory`;
TRUNCATE TABLE `inventory`;
CREATE TABLE IF NOT EXISTS `sales`;
TRUNCATE TABLE `sales`;
SET FOREIGN_KEY_CHECKS = 1;