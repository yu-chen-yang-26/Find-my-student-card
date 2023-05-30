DROP DATABASE IF EXISTS `lost_found`;
CREATE DATABASE `lost_found`;

USE `lost_found`;

-- schema --
CREATE TABLE `USER` (
    `User_id` INT AUTO_INCREMENT,
    `Name` VARCHAR(50),
    `NTUid` CHAR(9) UNIQUE,
    `ROCid` CHAR(10) UNIQUE,
    `Lang` VARCHAR(5) DEFAULT 'zh-TW',
    `Password` VARCHAR(20),
    PRIMARY KEY (`User_id`)
);

CREATE TABLE `ITEM_GROUP` (
    `Group_id` INT AUTO_INCREMENT,
    `ImagePath` VARCHAR(255),
    `Description` VARCHAR(100),
    PRIMARY KEY (`Group_id`) 
);

CREATE TABLE `LOCATION` (
    `Location_id` VARCHAR(20),
    `Coordinate` POINT NOT NULL,
    PRIMARY KEY (`Location_id`)
);

CREATE TABLE `ITEM` (
    `Item_id` INT AUTO_INCREMENT,
    `Category` VARCHAR(20) NOT NULL, 
    `Discoverer` INT NOT NULL,
    `Discover_location` VARCHAR(20) NOT NULL,
    `Discover_location_userDefCoord` POINT,
    `Retrieve_location` VARCHAR(20),
    `Item_group` INT,
    `Owner_NTUid` CHAR(9),
    `Owner_name` VARCHAR(50),
    `Is_retrieved` BOOLEAN NOT NULL DEFAULT FALSE,
    `Image_path` VARCHAR(255),
    `Description` VARCHAR(100),
    `Create_time` DATETIME DEFAULT CURRENT_TIMESTAMP NULL,
    PRIMARY KEY (`Item_id`),
    FOREIGN KEY (`Discoverer`) REFERENCES `USER`(`User_id`) ON UPDATE CASCADE,
    FOREIGN KEY (`Discover_location`) REFERENCES `LOCATION`(`Location_id`) ON UPDATE CASCADE,
    FOREIGN KEY (`Retrieve_location`) REFERENCES `LOCATION`(`Location_id`) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (`Item_group`) REFERENCES `ITEM_GROUP`(`Group_id`) ON DELETE SET NULL ON UPDATE CASCADE
);

-- init test data --

INSERT INTO `USER` (`User_id`, `Name`, `NTUid`, `ROCid`) VALUES
    (1, 'guest', NULL, NULL),
    (2, '李大灰', 'b11902000', NULL),
    (3, '陳阿扁', 'b11902001', NULL),
    (4, '馬小九', 'b11902002', NULL),
    (5, '菜陰魂', 'b11902003', NULL);

INSERT INTO `ITEM_GROUP` (`Group_id`, `ImagePath`, `Description`) VALUES
    (1, NULL, 'wallets and keys'),
    (2, './images/shms-lost-and-found.jpg', 'cellphone, calculator, glasses, keys, and more');

INSERT INTO `LOCATION` VALUES
    ('學生第一活動中心', Point(25.017788451661186, 121.5401106798083)),
    ('總圖書館', Point(25.017460840854895, 121.54059784843746)),
    ('體育中心', Point(25.022113184524006, 121.53525607175796));

INSERT INTO `ITEM` (`Item_id`, `Category`, `Discoverer`, `Discover_location`, 
    `Retrieve_location`, `Item_group`, `Image_path`, `Description`, `Create_time`) 
VALUES
    (1, '鑰匙', 1, '總圖書館', '總圖書館', NULL, NULL, '', '2012-06-18 10:34:09'),
    (2, '鑰匙', 2, '總圖書館', '學生第一活動中心', 1, './images/key.jpeg', '喇叭鎖鑰匙', CURRENT_TIMESTAMP),
    (3, '錢包', 2, '總圖書館', '學生第一活動中心', 1, './images/wallet.jpeg', '是美金！', CURRENT_TIMESTAMP);