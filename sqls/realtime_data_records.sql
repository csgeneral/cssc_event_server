/*
 Navicat Premium Data Transfer

 Source Server         : cssc
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : localhost:3306
 Source Schema         : cssc

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 26/12/2022 18:48:22
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for realtime_data_records
-- ----------------------------
DROP TABLE IF EXISTS `realtime_data_records`;
CREATE TABLE `realtime_data_records` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `channel` int NOT NULL,
  `record_time` datetime DEFAULT NULL,
  `newuser` int NOT NULL,
  `active_user` int NOT NULL,
  `online_user` int NOT NULL,
  `newuser_pay_money` int NOT NULL,
  `active_user_pay_money` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=263 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
