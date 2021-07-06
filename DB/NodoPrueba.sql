-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         10.4.11-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para NodoPrueba
CREATE DATABASE IF NOT EXISTS `nodoprueba` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `NodoPrueba`;

-- Volcando estructura para tabla NodoPrueba.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(100) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category` (`category`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla NodoPrueba.categories: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` (`category_id`, `category`) VALUES
	(1, 'Belico'),
	(5, 'Comedia'),
	(4, 'Dramatico'),
	(2, 'Guerra'),
	(3, 'Romance'),
	(6, 'Terror');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;

-- Volcando estructura para tabla NodoPrueba.poems
CREATE TABLE IF NOT EXISTS `poems` (
  `poem_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `poem` text NOT NULL,
  `date_submitted` datetime NOT NULL,
  `category_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date_approved` datetime NOT NULL,
  PRIMARY KEY (`poem_id`),
  KEY `FK_poems_categories` (`category_id`),
  KEY `FK_poems_users` (`user_id`),
  CONSTRAINT `FK_poems_categories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_poems_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla NodoPrueba.poems: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `poems` DISABLE KEYS */;
INSERT INTO `poems` (`poem_id`, `title`, `poem`, `date_submitted`, `category_id`, `user_id`, `date_approved`) VALUES
	(1, 'poema', 'este es un poema de prueba', '2021-07-05 00:00:00', 5, 1, '2021-07-05 21:10:13'),
	(2, 'practica', 'poema 22222', '2021-07-05 00:00:00', 3, 1, '2021-07-05 21:10:13'),
	(3, 'poema de juan', 'este es un poema de juan', '2021-07-05 00:00:00', 4, 2, '2021-07-05 21:13:26');
/*!40000 ALTER TABLE `poems` ENABLE KEYS */;

-- Volcando estructura para tabla NodoPrueba.tokens
CREATE TABLE IF NOT EXISTS `tokens` (
  `token_id` int(11) NOT NULL AUTO_INCREMENT,
  `token` char(64) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token_expires` datetime NOT NULL,
  PRIMARY KEY (`token_id`),
  KEY `FK_tokens_users` (`user_id`),
  CONSTRAINT `FK_tokens_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla NodoPrueba.tokens: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
INSERT INTO `tokens` (`token_id`, `token`, `user_id`, `token_expires`) VALUES
	(1, 'Generar token aqui', 1, '2021-07-05 21:09:54'),
	(2, 'Generar token aqui', 2, '2021-07-05 21:11:23');
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;

-- Volcando estructura para tabla NodoPrueba.users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(30) NOT NULL,
  `pass_phrase` varchar(500) NOT NULL,
  `is_admin` tinyint(4) NOT NULL,
  `date_registered` datetime NOT NULL,
  `profile_pic` varchar(30) NOT NULL,
  `registration_confirmed` tinyint(4) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla NodoPrueba.users: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `email`, `username`, `pass_phrase`, `is_admin`, `date_registered`, `profile_pic`, `registration_confirmed`) VALUES
	(1, 'Luis', 'Sarmiento', 'luissar14@gmail.com', 'allen', 'entrar', 0, '2021-07-05 21:09:54', 'aimagen', 1),
	(2, 'Juan ', 'Cuenca', 'juan@gmail.com', 'juianito', 'pasar porf', 0, '2021-07-06 02:11:23', 'imagen juan', 1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
