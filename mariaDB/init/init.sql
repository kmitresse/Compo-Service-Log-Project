CREATE DATABASE IF NOT EXISTS db_prod;
USE db_prod;

CREATE TABLE IF NOT EXISTS `web-log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `request` text NOT NULL,
  `ip_user` varchar(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `nudgerData` (
  `code` text NOT NULL UNIQUE,
  `country` text
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `openfoodfactData` (
  `code` varchar(20) NOT NULL UNIQUE,
  `country` varchar(10) NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `databasesCustom` (
  `input` varchar(255) NOT NULL,
  `output` varchar(255) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8;