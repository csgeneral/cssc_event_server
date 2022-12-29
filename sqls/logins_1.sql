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

 Date: 29/12/2022 10:28:09
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for logins_1
-- ----------------------------
DROP TABLE IF EXISTS `logins_1`;
CREATE TABLE `logins_1` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `cur_diamond` int NOT NULL,
  `cur_task_id` int NOT NULL,
  `total_buy_cnt` int NOT NULL,
  `total_pay_money` int NOT NULL,
  `total_video_cnt` int NOT NULL,
  `total_live_day` int NOT NULL,
  `insert_time` datetime NOT NULL,
  `insert_timestamp` int NOT NULL,
  `os` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=239 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
