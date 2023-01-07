-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 07-Jan-2023 às 17:56
-- Versão do servidor: 10.4.14-MariaDB
-- versão do PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `terrasapp-vini`
--
CREATE DATABASE IF NOT EXISTS `terrasapp-vini` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `terrasapp-vini`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `sales`
--

DROP TABLE IF EXISTS `sales`;
CREATE TABLE IF NOT EXISTS `sales` (
  `saleId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `purchaserName` varchar(100) NOT NULL,
  `itemDescription` varchar(255) NOT NULL,
  `itemPrice` double NOT NULL,
  `purchaseCount` int(5) NOT NULL,
  `merchantAddress` varchar(255) NOT NULL,
  `merchantName` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`saleId`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `sales`
--

INSERT INTO `sales` (`saleId`, `purchaserName`, `itemDescription`, `itemPrice`, `purchaseCount`, `merchantAddress`, `merchantName`, `createdAt`, `updatedAt`) VALUES
(30, 'JoÃ£o Silva', 'R$10 off R$20 of food', 10, 2, '987 Fake St12', 'Bob\'s Pizza', '2023-01-07 05:31:29', '2023-01-07 06:47:40'),
(31, 'Amy Pond', 'R$30 of awesome for R$10', 10, 5, '456 Unreal Rd', 'Tom\'s Awesome Shop', '2023-01-07 05:31:29', '2023-01-07 05:31:29'),
(32, 'Marty McFly', 'R$20 Sneakers for R$5', 5, 1, '123 Fake St', 'Sneaker Store Emporium', '2023-01-07 05:31:29', '2023-01-07 05:31:29'),
(33, 'Snake Plissken', 'R$20 Sneakers for R$5', 5, 4, '123 Fake St', 'Sneaker Store Emporium', '2023-01-07 05:31:29', '2023-01-07 05:31:29'),
(34, 'JoÃ£o Silva', 'R$10 off R$20 of food', 10, 2, '987 Fake St', 'Bob\'s Pizza', '2023-01-07 05:34:42', '2023-01-07 05:34:42'),
(35, 'Amy Pond', 'R$30 of awesome for R$10', 10, 5, '456 Unreal Rd', 'Tom\'s Awesome Shop', '2023-01-07 05:34:42', '2023-01-07 05:34:42'),
(36, 'Marty McFly', 'R$20 Sneakers for R$5', 5, 1, '123 Fake St', 'Sneaker Store Emporium', '2023-01-07 05:34:42', '2023-01-07 05:34:42'),
(37, 'Snake Plissken', 'R$20 Sneakers for R$5', 5, 4, '123 Fake St', 'Sneaker Store Emporium', '2023-01-07 05:34:42', '2023-01-07 05:34:42'),
(38, 'sadas', 'dsadsads', 0, 23, 'fsdfsdfsdfsd', 'dsffsd', '2023-01-07 05:34:55', '2023-01-07 05:34:55'),
(39, 'JoÃ£o Silva', 'R$10 off R$20 of food', 10, 2, '987 Fake St', 'Bob\'s Pizza', '2023-01-07 06:15:45', '2023-01-07 06:15:45'),
(40, 'Amy Pond', 'R$30 of awesome for R$10', 10, 5, '456 Unreal Rd', 'Tom\'s Awesome Shop', '2023-01-07 06:15:46', '2023-01-07 06:15:46'),
(41, 'Marty McFly', 'R$20 Sneakers for R$5', 5, 1, '123 Fake St', 'Sneaker Store Emporium', '2023-01-07 06:15:46', '2023-01-07 06:15:46'),
(44, 'JoÃ£o Silva', 'R$10 off R$20 of food', 10, 2, '987 Fake St', 'Bob\'s Pizza', '2023-01-07 07:27:49', '2023-01-07 07:27:49'),
(45, 'Amy Pond', 'R$30 of awesome for R$10', 10, 5, '456 Unreal Rd', 'Tom\'s Awesome Shop', '2023-01-07 07:27:49', '2023-01-07 07:27:49'),
(46, 'Marty McFly', 'R$20 Sneakers for R$5', 5, 1, '123 Fake St', 'Sneaker Store Emporium', '2023-01-07 07:27:49', '2023-01-07 07:27:49'),
(47, 'Snake Plissken', 'R$20 Sneakers for R$5', 5, 4, '123 Fake St', 'Sneaker Store Emporium', '2023-01-07 07:27:49', '2023-01-07 07:27:49'),
(48, 'effdfg', 'fdgdfgdf', 0, 3, 'sdsdsds', 'dsdsd', '2023-01-07 07:28:18', '2023-01-07 07:30:15');

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `userId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `login` varchar(16) NOT NULL,
  `password` varchar(16) NOT NULL,
  `status` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `mail` (`mail`),
  UNIQUE KEY `userId` (`userId`),
  UNIQUE KEY `login` (`login`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`userId`, `name`, `mail`, `login`, `password`, `status`, `createdAt`, `updatedAt`) VALUES
(86, 'Vinícius Moreira da Silva Braga', 'vmsb11@yahoo.com.br', 'vmsb11', '123456', 'Ativo', '2022-11-30 15:17:56', '2023-01-07 03:35:24');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
