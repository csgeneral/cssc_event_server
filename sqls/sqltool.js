let fs = require('fs')

let channel = 1
let maxmaintype = 13

let sqlstr =
    `/*
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
`

for (i = 1; i <= 13; i++) {
    sqlstr = sqlstr + `
-- ----------------------------
--  Table structure for "channel${channel}_maintype${i}_eventlogs"
-- ----------------------------
DROP TABLE IF EXISTS "channel${channel}_maintype${i}_eventlogs";
CREATE TABLE "channel${channel}_maintype${i}_eventlogs" (
  "id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "user_id" varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  "event_main_type" int(11) NOT NULL,
  "event_sub_type" int(11) NOT NULL,
  "param1" varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  "param2" varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  "param3" varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '',
  "param4" varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "custom_param" varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT '',
  "insert_time" datetime NOT NULL,
  "insert_timestamp" int(11) NOT NULL,
  PRIMARY KEY ("id")
) ENGINE=InnoDB AUTO_INCREMENT=34877 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

`
}

sqlstr = sqlstr + 'SET FOREIGN_KEY_CHECKS = 1;'

fs.writeFileSync(`channel_${channel}_eventlogs_table_create.sql`, sqlstr)