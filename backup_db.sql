-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: hotel
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `Empresa` varchar(100) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `CUIT` varchar(13) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `Telefono` varchar(20) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habitaciones`
--

DROP TABLE IF EXISTS `habitaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habitaciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `estado` int DEFAULT NULL,
  `tipo_habitacion_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tipo_habitacion_id_idx` (`tipo_habitacion_id`),
  CONSTRAINT `tipo_habitacion_id` FOREIGN KEY (`tipo_habitacion_id`) REFERENCES `habitaciones_tipos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habitaciones`
--

LOCK TABLES `habitaciones` WRITE;
/*!40000 ALTER TABLE `habitaciones` DISABLE KEYS */;
INSERT INTO `habitaciones` VALUES (1,0,1),(2,2,1),(3,0,2),(4,0,2),(5,0,3),(6,1,3),(7,0,2),(8,0,2),(9,0,3),(10,0,3),(11,0,3),(12,0,3),(13,0,3),(14,0,3),(15,0,3),(16,0,1),(17,0,1),(18,0,4),(19,0,5),(20,0,4),(21,0,6),(22,0,6);
/*!40000 ALTER TABLE `habitaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habitaciones_estados`
--

DROP TABLE IF EXISTS `habitaciones_estados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habitaciones_estados` (
  `id` int NOT NULL AUTO_INCREMENT,
  `estado` varchar(45) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habitaciones_estados`
--

LOCK TABLES `habitaciones_estados` WRITE;
/*!40000 ALTER TABLE `habitaciones_estados` DISABLE KEYS */;
INSERT INTO `habitaciones_estados` VALUES (0,'Libre'),(1,'Ocupada'),(2,'Mantenimiento');
/*!40000 ALTER TABLE `habitaciones_estados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habitaciones_tipos`
--

DROP TABLE IF EXISTS `habitaciones_tipos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habitaciones_tipos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `camas_simples` int DEFAULT NULL,
  `camas_matrimoniales` int DEFAULT NULL,
  `importe` double DEFAULT NULL,
  `ejecutiva` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habitaciones_tipos`
--

LOCK TABLES `habitaciones_tipos` WRITE;
/*!40000 ALTER TABLE `habitaciones_tipos` DISABLE KEYS */;
INSERT INTO `habitaciones_tipos` VALUES (1,'Simple',1,0,5500,0),(2,'Matrimonial',0,1,6000,0),(3,'Doble',2,0,6000,0),(4,'Matrimonial Ejecutiva',0,1,9000,1),(5,'Familiar Ejecutiva',1,1,10000,1),(6,'Triple',3,0,8000,0);
/*!40000 ALTER TABLE `habitaciones_tipos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medios_de_pagos`
--

DROP TABLE IF EXISTS `medios_de_pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medios_de_pagos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medios_de_pagos`
--

LOCK TABLES `medios_de_pagos` WRITE;
/*!40000 ALTER TABLE `medios_de_pagos` DISABLE KEYS */;
/*!40000 ALTER TABLE `medios_de_pagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservas`
--

DROP TABLE IF EXISTS `reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT (curdate()),
  `huesped` varchar(100) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `habitacion_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `importe` double DEFAULT NULL,
  `estado_id` int DEFAULT '0',
  `descuento` float DEFAULT '0',
  `medio_pago_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_fecha_habitacion` (`fecha`,`habitacion_id`),
  KEY `habitacion_id_idx` (`habitacion_id`),
  CONSTRAINT `habitacion_id` FOREIGN KEY (`habitacion_id`) REFERENCES `habitaciones` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservas`
--

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
INSERT INTO `reservas` VALUES (1,'2023-06-22','AAAAAAA',11,'2023-06-22 20:27:02','2023-06-22 20:27:02',6000,0,0,NULL),(2,'2023-06-24','',6,'2023-06-24 11:22:17','2023-06-24 11:22:17',6000,2,0,NULL),(3,'2023-06-25','',6,'2023-06-24 12:30:05','2023-06-24 12:30:05',6000,2,0,NULL),(4,'2023-06-26','',6,'2023-06-24 16:56:49','2023-06-24 16:56:49',6000,0,0,NULL),(5,'2023-06-27','',6,'2023-06-24 16:56:49','2023-06-24 16:56:49',6000,0,0,NULL),(6,'2023-06-28','',6,'2023-06-24 16:56:49','2023-06-24 16:56:49',6000,0,0,NULL);
/*!40000 ALTER TABLE `reservas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservas_estados`
--

DROP TABLE IF EXISTS `reservas_estados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservas_estados` (
  `id` int NOT NULL AUTO_INCREMENT,
  `estado` varchar(45) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservas_estados`
--

LOCK TABLES `reservas_estados` WRITE;
/*!40000 ALTER TABLE `reservas_estados` DISABLE KEYS */;
INSERT INTO `reservas_estados` VALUES (0,'Pendiente'),(1,'Facturada'),(2,'Cobrada');
/*!40000 ALTER TABLE `reservas_estados` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-24 17:14:44
