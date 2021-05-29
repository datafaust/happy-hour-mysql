CREATE TABLE `carts` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `customer_id` vsarchar(255),
  `cart_name` varchar(255),
  `lat` float,
  `lon` float,
  `address` varchar(255),
  `active` boolean,
  `city_id` int
);

CREATE TABLE `city` (
  `id` int PRIMARY KEY,
  `city_name` varchar(255),
  `zip_code` int
);

CREATE TABLE `customer` (
  `id` int PRIMARY KEY,
  `customer_name` varchar(255),
  `city_id` int,
  `phone` varchar(255),
  `email` varchar(255),
  `time_joined` timestamp
);

CREATE TABLE `menu_item` (
  `id` int PRIMARY KEY,
  `customer_id` varchar(255),
  `cart_id` int,
  `item_name` varchar(255),
  `category_id` int,
  `offer_id` int,
  `description` text,
  `condiments` Json,
  `price` decimal(12,2),
  `active` boolean
);

CREATE TABLE `condiments` (
  `id` int PRIMARY KEY,
  `condiment_name` varchar(255),
  `include` boolean,
  `price` decimal(12,2)
);

CREATE TABLE `in_offer` (
  `id` int PRIMARY KEY,
  `offer_id` int,
  `menu_item_id` int
);

CREATE TABLE `offer` (
  `id` int PRIMARY KEY,
  `datetime_active_from` timestamp,
  `datetime_active_to` timestamp,
  `offer_price` decimal(12,2)
);

CREATE TABLE `placed_orders` (
  `id` int PRIMARY KEY,
  `restaurant_id` int,
  `order_time` datetime,
  `customer_id` int,
  `menu_item_id` int,
  `condiments` json,
  `price` decimal(12,2),
  `discount` decimal(12,2),
  `final_price` decimal(12,2),
  `comment` text,
  `ts` timestamp
);

CREATE TABLE `comment` (
  `id` int PRIMARY KEY,
  `placed_order_id` int,
  `comment_text` text,
  `ts` timestamp
);

CREATE TABLE `in_order` (
  `id` int PRIMARY KEY,
  `placed_order_id` int,
  `offer_id` int,
  `menu_item_id` int,
  `quantity` int,
  `item_price` int,
  `condiments` json,
  `price` decimal(12,2),
  `comment` text
);

CREATE TABLE `order_status` (
  `id` int PRIMARY KEY,
  `placed_order_id` int,
  `status_catalogue_id` int,
  `ts` timestamp
);

CREATE TABLE `status_catalogue` (
  `id` int,
  `status_nam` varchar(255)
);

ALTER TABLE `carts` ADD FOREIGN KEY (`city_id`) REFERENCES `city` (`id`);

ALTER TABLE `city` ADD FOREIGN KEY (`id`) REFERENCES `customer` (`city_id`);

ALTER TABLE `carts` ADD FOREIGN KEY (`id`) REFERENCES `customer` (`id`);

ALTER TABLE `condiments` ADD FOREIGN KEY (`id`) REFERENCES `menu_item` (`id`);

ALTER TABLE `menu_item` ADD FOREIGN KEY (`offer_id`) REFERENCES `in_offer` (`offer_id`);

ALTER TABLE `in_offer` ADD FOREIGN KEY (`offer_id`) REFERENCES `offer` (`id`);

ALTER TABLE `comment` ADD FOREIGN KEY (`placed_order_id`) REFERENCES `placed_orders` (`id`);

ALTER TABLE `placed_orders` ADD FOREIGN KEY (`id`) REFERENCES `in_order` (`placed_order_id`);

ALTER TABLE `placed_orders` ADD FOREIGN KEY (`id`) REFERENCES `order_status` (`placed_order_id`);

ALTER TABLE `order_status` ADD FOREIGN KEY (`status_catalogue_id`) REFERENCES `status_catalogue` (`id`);

ALTER TABLE `customer` ADD FOREIGN KEY (`id`) REFERENCES `placed_orders` (`customer_id`);
