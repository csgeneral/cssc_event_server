/*
 Navicat Premium Data Transfer

 Source Server         : cssc-online
 Source Server Type    : MySQL
 Source Server Version : 50732
 Source Host           : localhost
 Source Database       : cssc

 Target Server Type    : MySQL
 Target Server Version : 50732
 File Encoding         : utf-8

 Date: 10/01/2022 16:15:04 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `channel1_maintype1_eventlogs`
-- ----------------------------
DROP TABLE IF EXISTS `channel1_maintype1_eventlogs`;
CREATE TABLE `channel1_maintype1_eventlogs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_main_type` int(11) NOT NULL,
  `event_sub_type` int(11) NOT NULL,
  `param1` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param2` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param3` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param4` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `custom_param` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `insert_time` datetime NOT NULL,
  `insert_timestamp` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34877 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ----------------------------
--  Table structure for `channel1_maintype2_eventlogs`
-- ----------------------------
DROP TABLE IF EXISTS `channel1_maintype2_eventlogs`;
CREATE TABLE `channel1_maintype2_eventlogs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_main_type` int(11) NOT NULL,
  `event_sub_type` int(11) NOT NULL,
  `param1` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param2` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param3` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param4` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `custom_param` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `insert_time` datetime NOT NULL,
  `insert_timestamp` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34877 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ----------------------------
--  Table structure for `channel1_maintype3_eventlogs`
-- ----------------------------
DROP TABLE IF EXISTS `channel1_maintype3_eventlogs`;
CREATE TABLE `channel1_maintype3_eventlogs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_main_type` int(11) NOT NULL,
  `event_sub_type` int(11) NOT NULL,
  `param1` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param2` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param3` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param4` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `custom_param` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `insert_time` datetime NOT NULL,
  `insert_timestamp` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34877 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ----------------------------
--  Table structure for `channel1_maintype4_eventlogs`
-- ----------------------------
DROP TABLE IF EXISTS `channel1_maintype4_eventlogs`;
CREATE TABLE `channel1_maintype4_eventlogs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_main_type` int(11) NOT NULL,
  `event_sub_type` int(11) NOT NULL,
  `param1` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param2` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param3` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param4` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `custom_param` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `insert_time` datetime NOT NULL,
  `insert_timestamp` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34877 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ----------------------------
--  Table structure for `channel1_maintype5_eventlogs`
-- ----------------------------
DROP TABLE IF EXISTS `channel1_maintype5_eventlogs`;
CREATE TABLE `channel1_maintype5_eventlogs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_main_type` int(11) NOT NULL,
  `event_sub_type` int(11) NOT NULL,
  `param1` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param2` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param3` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param4` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `custom_param` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `insert_time` datetime NOT NULL,
  `insert_timestamp` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34877 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ----------------------------
--  Table structure for `channel1_maintype6_eventlogs`
-- ----------------------------
DROP TABLE IF EXISTS `channel1_maintype6_eventlogs`;
CREATE TABLE `channel1_maintype6_eventlogs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_main_type` int(11) NOT NULL,
  `event_sub_type` int(11) NOT NULL,
  `param1` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param2` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param3` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param4` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `custom_param` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `insert_time` datetime NOT NULL,
  `insert_timestamp` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34877 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ----------------------------
--  Table structure for `channel1_maintype7_eventlogs`
-- ----------------------------
DROP TABLE IF EXISTS `channel1_maintype7_eventlogs`;
CREATE TABLE `channel1_maintype7_eventlogs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_main_type` int(11) NOT NULL,
  `event_sub_type` int(11) NOT NULL,
  `param1` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param2` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param3` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param4` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `custom_param` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `insert_time` datetime NOT NULL,
  `insert_timestamp` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34877 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ----------------------------
--  Table structure for `channel1_maintype8_eventlogs`
-- ----------------------------
DROP TABLE IF EXISTS `channel1_maintype8_eventlogs`;
CREATE TABLE `channel1_maintype8_eventlogs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_main_type` int(11) NOT NULL,
  `event_sub_type` int(11) NOT NULL,
  `param1` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param2` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param3` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param4` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `custom_param` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `insert_time` datetime NOT NULL,
  `insert_timestamp` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34877 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ----------------------------
--  Table structure for `channel1_maintype9_eventlogs`
-- ----------------------------
DROP TABLE IF EXISTS `channel1_maintype9_eventlogs`;
CREATE TABLE `channel1_maintype9_eventlogs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_main_type` int(11) NOT NULL,
  `event_sub_type` int(11) NOT NULL,
  `param1` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param2` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param3` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param4` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `custom_param` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `insert_time` datetime NOT NULL,
  `insert_timestamp` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34877 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ----------------------------
--  Table structure for `channel1_maintype10_eventlogs`
-- ----------------------------
DROP TABLE IF EXISTS `channel1_maintype10_eventlogs`;
CREATE TABLE `channel1_maintype10_eventlogs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_main_type` int(11) NOT NULL,
  `event_sub_type` int(11) NOT NULL,
  `param1` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param2` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param3` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param4` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `custom_param` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `insert_time` datetime NOT NULL,
  `insert_timestamp` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34877 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ----------------------------
--  Table structure for `channel1_maintype11_eventlogs`
-- ----------------------------
DROP TABLE IF EXISTS `channel1_maintype11_eventlogs`;
CREATE TABLE `channel1_maintype11_eventlogs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_main_type` int(11) NOT NULL,
  `event_sub_type` int(11) NOT NULL,
  `param1` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param2` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param3` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param4` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `custom_param` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `insert_time` datetime NOT NULL,
  `insert_timestamp` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34877 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ----------------------------
--  Table structure for `channel1_maintype12_eventlogs`
-- ----------------------------
DROP TABLE IF EXISTS `channel1_maintype12_eventlogs`;
CREATE TABLE `channel1_maintype12_eventlogs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_main_type` int(11) NOT NULL,
  `event_sub_type` int(11) NOT NULL,
  `param1` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param2` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param3` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param4` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `custom_param` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `insert_time` datetime NOT NULL,
  `insert_timestamp` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34877 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ----------------------------
--  Table structure for `channel1_maintype13_eventlogs`
-- ----------------------------
DROP TABLE IF EXISTS `channel1_maintype13_eventlogs`;
CREATE TABLE `channel1_maintype13_eventlogs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_main_type` int(11) NOT NULL,
  `event_sub_type` int(11) NOT NULL,
  `param1` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param2` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param3` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `param4` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `custom_param` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `insert_time` datetime NOT NULL,
  `insert_timestamp` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34877 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;