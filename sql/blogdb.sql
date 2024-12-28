/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 90001
 Source Host           : localhost:3306
 Source Schema         : blogdb

 Target Server Type    : MySQL
 Target Server Version : 90001
 File Encoding         : 65001

 Date: 24/12/2024 15:33:39
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article_list
-- ----------------------------
DROP TABLE IF EXISTS `article_list`;
CREATE TABLE `article_list`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `Cover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '头像',
  `title` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '标题',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '内容',
  `classId` int NOT NULL COMMENT '分类Id',
  `createDate` datetime NOT NULL COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT NULL COMMENT '修改时间',
  `clicks` int NOT NULL DEFAULT 0 COMMENT '点击数',
  `createUserId` int NOT NULL COMMENT '创建人Id',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_6a25f8250cdcc667ba30bb7cd4`(`title`) USING BTREE,
  UNIQUE INDEX `IDX_803d647dca7a95007093a3679e`(`Cover`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 31 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article_list
-- ----------------------------

-- ----------------------------
-- Table structure for classification
-- ----------------------------
DROP TABLE IF EXISTS `classification`;
CREATE TABLE `classification`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_6d16b249bbcd93a087e56804b1`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of classification
-- ----------------------------

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `articleId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文章ID',
  `parentId` int NULL DEFAULT NULL COMMENT '父级ID',
  `replyName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '回复名称',
  `Content` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '内容',
  `createDate` datetime NOT NULL COMMENT '创建时间',
  `reviewerName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '评论人',
  `qq` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '账号',
  `httpsrc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '网址',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_72c5f8aa158d3bada627ff72b5`(`Content`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------

-- ----------------------------
-- Table structure for custom
-- ----------------------------
DROP TABLE IF EXISTS `custom`;
CREATE TABLE `custom`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '内容',
  `clicks` int NOT NULL DEFAULT 0 COMMENT '点击数',
  `createDate` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of custom
-- ----------------------------
INSERT INTO `custom` VALUES (1, '关于', '### 自我介绍\n> 自己写吧\n', 0, '2023-03-08 18:58:01');

-- ----------------------------
-- Table structure for daily_visit
-- ----------------------------
DROP TABLE IF EXISTS `daily_visit`;
CREATE TABLE `daily_visit`  (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Path` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `VisitDate` datetime NOT NULL,
  `VisitCount` int NOT NULL,
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of daily_visit
-- ----------------------------

-- ----------------------------
-- Table structure for links
-- ----------------------------
DROP TABLE IF EXISTS `links`;
CREATE TABLE `links`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文章标题',
  `Http_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '网址',
  `Description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '网址',
  `Status` int NOT NULL COMMENT '状态：1-启用，2-关闭',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of links
-- ----------------------------

-- ----------------------------
-- Table structure for random_write
-- ----------------------------
DROP TABLE IF EXISTS `random_write`;
CREATE TABLE `random_write`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `cover_list` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'url数组，josn数据',
  `Content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '内容',
  `createDate` datetime NOT NULL COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT NULL COMMENT '修改时间',
  `Clicks` int NULL DEFAULT NULL COMMENT '点击数',
  `createUserId` int NOT NULL COMMENT '创建人id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of random_write
-- ----------------------------

-- ----------------------------
-- Table structure for routing_configure
-- ----------------------------
DROP TABLE IF EXISTS `routing_configure`;
CREATE TABLE `routing_configure`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `primary_id` int NULL DEFAULT NULL COMMENT '父级ID',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '标题',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称（不要中文）',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '路由路径',
  `component` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '路由组件路径',
  `range` int NOT NULL COMMENT '范围： 0-后台， 1-前台',
  `menu` int NOT NULL COMMENT '是否菜单： 0-否， 1-是',
  `IconType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '图标',
  `serialNumber` int NOT NULL COMMENT '序号',
  `redirect` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '重定向路径',
  `Status` int NOT NULL COMMENT '状态：1-启用，2-关闭',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_538863c259977e9ab2a05800cd`(`title`) USING BTREE,
  UNIQUE INDEX `IDX_6d64f5f8baa53d0182dc3170e9`(`name`) USING BTREE,
  UNIQUE INDEX `IDX_c3c9c07cf5489774054e5d3fa8`(`path`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of routing_configure
-- ----------------------------
INSERT INTO `routing_configure` VALUES (1, NULL, '首页', 'home', '/home', '/home/index', 0, 1, 'House', 1, '', 1);
INSERT INTO `routing_configure` VALUES (2, NULL, '路由管理', 'routingManage', '/routingManage', '/routingManage/index', 0, 1, 'Cpu', 2, '', 1);
INSERT INTO `routing_configure` VALUES (15, NULL, '用户管理', 'userManage', '/userManage', '/userManage/index', 0, 1, 'User', 3, '', 1);
INSERT INTO `routing_configure` VALUES (18, NULL, '分类管理', 'classManage', '/classManage', '/classManage/index', 0, 1, 'Coin', 4, '', 1);
INSERT INTO `routing_configure` VALUES (19, NULL, '内容管理', 'articleManage', '/articleManage', '/articleManage/index', 0, 1, 'Postcard', 5, '', 1);
INSERT INTO `routing_configure` VALUES (20, NULL, '动态\\随写', 'randomWrite', '/randomWrite', '/randomWrite/index', 0, 1, 'ChatLineSquare', 6, '', 1);
INSERT INTO `routing_configure` VALUES (21, NULL, '评论管理', 'commentManage', '/commentManage', '/commentManage/index', 0, 1, 'ChatDotRound', 7, '', 1);
INSERT INTO `routing_configure` VALUES (22, NULL, '友情链接', 'links', '/links', '/links/index', 0, 1, 'Paperclip', 8, '', 1);
INSERT INTO `routing_configure` VALUES (23, NULL, '自定义', 'custom', '/custom', '/custom/index', 0, 1, 'Setting', 9, '', 1);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `Name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  `Portrait` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '头像',
  `Code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户账号',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户密码',
  `power` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户权限',
  `eMail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '邮箱',
  `status` int NOT NULL COMMENT '状态：1-启用，2-关闭',
  `Token` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'token',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_065d4d8f3b5adb4a08841eae3c`(`Name`) USING BTREE,
  UNIQUE INDEX `IDX_c5f78ad8f82e492c25d07f047a`(`Code`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (2, 'Fisherman', '[\"/imgS/6971683950120931328.jpeg\"]', 'admin', 'e10adc3949ba59abbe56e057f20f883e', '[1,15,2,17,18,19,20,21,22,23]', '123456789@qq.com', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImp0aSI6IjU1NmI3Y2ZhLTEyM2EtNGMyZS1iYjllLTY4MjUxNGE1NjQ5OSIsImV4cCI6MTgxMzgyMjIzOSwiaXNzIjoibm90ZGVmaW5lZDQxIGFuZCBmaXNoZXJtYW4iLCJhdWQiOiJub3RkZWZpbmVkNDAifQ.giELvAKnUWp_oB9WbwjoXb3NvmpDcJX-blbx6wQA5Uc');


SET FOREIGN_KEY_CHECKS = 1;
