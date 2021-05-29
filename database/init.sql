CREATE DATABASE parkdb;
USE parkdb;
SET SQL_SAFE_UPDATES = 0;

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;


CREATE TABLE city (
  id int,
  city_name varchar(255),
  zip_code int
);

INSERT INTO city (id, city_name, zip_code)
VALUES
(1,'New York', 11368),
(1,'New York', 11106),
(2,'Philadelphia',11456),
(2,'Philadelphia',11457),
(3,'Boston',11256),
(3,'Boston',11389);

CREATE TABLE customer (
  id int(5) PRIMARY KEY AUTO_INCREMENT,
  fbid VARCHAR(255),
  customer_name varchar(255),
  city_id int,
  phone varchar(255),
  email varchar(255),
  time_joined timestamp,
  coins int(5)
);

INSERT INTO customer(id,fbid,customer_name,city_id,phone,email,time_joined)
VALUES
(1,'koojo', 'John Smith', 1, '7189786524', 'jsmith@gmail.com', '2020-10-01 22:00:00'),
(2,'foosi', 'Allam Fromberg', 1, '6469786578', 'aberg@gmail.com', '2020-10-04 13:00:00');

CREATE TABLE cart (
  id int PRIMARY KEY AUTO_INCREMENT,
  customer_id varchar(255),
  cart_name varchar(255),
  lat float,
  lon float,
  cart_address varchar(255),
  active boolean,
  city_id int
);

INSERT INTO cart(id,customer_id,cart_name,lat,lon,cart_address,active,city_id)
VALUES
(1,'koojo','Rafiqquis Halal', '43.0000', '-73.0000', '23-55 Broadway Street', '1',1),
(2,'koojo','Rafiqquis Halal', '43.1212', '-73.2431', '57-34 Main Street', '1',1),
(3,'foosi','Adels Halal', '43.0987', '-73.0987', '110-32 Munch Street', '1',1);


CREATE TABLE menu (
  id int PRIMARY KEY AUTO_INCREMENT,
  cart_id int,
  menu_name varchar(255),
  time_created timestamp
);

CREATE TABLE meal_key (
   id          INTEGER  NOT NULL PRIMARY KEY 
  ,meal        VARCHAR(17) NOT NULL
  ,meal_description VARCHAR(9) NOT NULL
);
INSERT INTO meal_key(id,meal,meal_description) VALUES (1,'chicken over rice','blah blah');
INSERT INTO meal_key(id,meal,meal_description) VALUES (2,'lamb over rice','blah blah');
INSERT INTO meal_key(id,meal,meal_description) VALUES (3,'combo over rice','blah blah');
INSERT INTO meal_key(id,meal,meal_description) VALUES (4,'fish over rice','blah blah');
INSERT INTO meal_key(id,meal,meal_description) VALUES (5,'chicken gyro','blah blah');
INSERT INTO meal_key(id,meal,meal_description) VALUES (6,'lamb gyro','blah blah');
INSERT INTO meal_key(id,meal,meal_description) VALUES (7,'combo gyro','blah blah');



CREATE TABLE menu_item (
  id int PRIMARY KEY AUTO_INCREMENT,
  customer_id varchar(255),
  cart_id int,
  item_name varchar(255),
  category_id int,
  offer_id int,
  item_description text,
  condiments Json,
  price decimal(12,2),
  active boolean
);

INSERT INTO menu_item(id,customer_id,cart_id,item_name,category_id,offer_id,item_description,condiments,price,active)
VALUES
(1,'koojo',1,'Chicken Over Rice',1,1,'halal chicken served over rice','[{ "id": "1", "value": "white sauce", "isChecked": "false" },{ "id": "2", "value": "red sauce", "isChecked": "true" },{ "id": "3", "value": "green sauce", "isChecked": "false" },{ "id": "3", "value": "salad", "isChecked": "false" }]',6,1),
(2,'koojo',2,'Lamb Over Rice',1,1,'halal lamb served over rice','[{ "id": "1", "value": "white sauce", "isChecked": "false" },{ "id": "2", "value": "red sauce", "isChecked": "true" },{ "id": "3", "value": "green sauce", "isChecked": "false" },{ "id": "3", "value": "salad", "isChecked": "false" }]',6,1),
(3,'foosi',3,'Combo Over Rice',1,1,'lamb and chicken served over rice','[{ "id": "1", "value": "white sauce", "isChecked": "false" },{ "id": "2", "value": "red sauce", "isChecked": "true" },{ "id": "3", "value": "green sauce", "isChecked": "false" },{ "id": "3", "value": "salad", "isChecked": "false" }]',7,1),
(4,'foosi',3,'Drink',1,1,'Drink','[{ "id": "1", "value": "soda", "isChecked": "false" },{ "id": "2", "value": "water", "isChecked": "true" }]',1,1);

CREATE TABLE in_offer (
  id int PRIMARY KEY AUTO_INCREMENT,
  offer_id int,
  menu_item_id int
);

INSERT INTO in_offer(id,offer_id,menu_item_id)
VALUES
(1,1,1),
(2,1,2);

CREATE TABLE offer (
  id int PRIMARY KEY AUTO_INCREMENT,
  datetime_active_from timestamp,
  datetime_active_to timestamp,
  offer_price decimal(12,2)
);

INSERT INTO offer(id,datetime_active_from,datetime_active_to,offer_price)
VALUES
(1,STR_TO_DATE('10/01/2020 10:10:15','%d/%m/%Y %H:%i:%s'), STR_TO_DATE('12/01/2020 10:10:15','%d/%m/%Y %H:%i:%s'),4),
(2,STR_TO_DATE('10/01/2020 10:10:15','%d/%m/%Y %H:%i:%s'), STR_TO_DATE('12/01/2020 10:10:15','%d/%m/%Y %H:%i:%s'),3);

CREATE TABLE placed_orders (
  id int PRIMARY KEY AUTO_INCREMENT,
  cart_id int,
  order_time datetime,
  customer_id varchar(255),
  menu_item_id int,
  condiments json,
  price decimal(12,2),
  discount decimal(12,2),
  final_price decimal(12,2),
  comment text,
  order_datetime timestamp
);

CREATE TABLE comment (
  id int PRIMARY KEY AUTO_INCREMENT,
  placed_order_id int,
  comment_text text,
  ts timestamp
);

CREATE TABLE in_order (
  id int PRIMARY KEY,
  placed_order_id int,
  offer_id int,
  menu_item_id int,
  quantity int,
  item_price int,
  condiments json,
  price decimal(12,2),
  comment text
);

CREATE TABLE order_status (
  id int PRIMARY KEY,
  placed_order_id int,
  status_catalogue_id int,
  ts timestamp
);

CREATE TABLE status_catalogue (
  id int,
  status_nam varchar(255)
);

