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

 Date: 23/11/2022 10:53:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for daily_cache
-- ----------------------------
DROP TABLE IF EXISTS `daily_cache`;
CREATE TABLE `daily_cache` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `channel` int NOT NULL,
  `daily_type` int NOT NULL,
  `date` datetime DEFAULT NULL,
  `channel_newuser` int NOT NULL,
  `newuser` int NOT NULL,
  `finish_register_rate` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `finish_guide_user` int NOT NULL,
  `revenue_cnt` int NOT NULL,
  `revenue_people_cnt` int NOT NULL,
  `revenue_total` int NOT NULL,
  `finish_guide_rate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `revenue_people_rate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `arpu` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ad_arpu` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `day_1_user_rate` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `channel_day_1_user_rate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `day_2_user_rate` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `day_6_user_rate` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `channel_day_6_user_rate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=249 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
