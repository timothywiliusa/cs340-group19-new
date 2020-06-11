DELIMITER //
CREATE TRIGGER before_insert_merch BEFORE INSERT ON merch
FOR EACH ROW
BEGIN
	IF (NEW.quantity > 9999)
    	THEN
        	set NEW.quantity = 9999;
    ELSEIF (NEW.quantity < 1)
    	THEN
        	SET NEW.quantity = 1;
    END IF;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER before_insert_price BEFORE INSERT ON merch
FOR EACH ROW
BEGIN
	IF (NEW.price < 1)
    	THEN
        	set NEW.price = 1;
    END IF;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER before_insert_user BEFORE INSERT ON user
FOR EACH ROW
BEGIN
	IF (NEW.zip IS NULL)THEN
        	set NEW.zip = 0;
    END IF;
    IF (NEW.planetNum IS NULL) THEN
        	set NEW.planetNum = 0;
    END IF;
    IF (NEW.Xcoord IS NULL)THEN
        	set NEW.Xcoord = 0;
    END IF;
    IF (NEW.Ycoord IS NULL)THEN
        	set NEW.Ycoord = 0;
    END IF;
    IF (NEW.POBox IS NULL)THEN
        	set NEW.POBox = 0;
    END IF;
END;
//
DELIMITER ;
/* select the user information*/
SELECT username, zip, planetNum, Xcoord, Ycoord, POBox FROM user WHERE username = (?)
/* update the user information on the edit page  */
UPDATE user SET zip=?, planetNum=?, Xcoord=?, Ycoord=?, POBox=? WHERE username = ?
/* insert into the user table a new user when they register  */
INSERT INTO user (username, passcode, zip, planetNum, Xcoord, Ycoord, POBox) VALUES (?,?,?,?,?,?,?)
/* grab the user information when they go to edit to pre-populate  */
SELECT zip, planetNum, Xcoord, Ycoord, POBox FROM user WHERE username = (?)
/* grab the user merch with the merch that matches the username  */
SELECT id, title, merchType, price, quantity FROM merch WHERE user = (?)
/* delete the merch when the user wants to remove item  */
DELETE FROM merch WHERE id = ?
/* insert new item into merch when user wants to  */
INSERT INTO merch (title, merchType, quantity, price, user) VALUES (?,?,?,?,?)
/* update the merch item when the user goes to edit  */
UPDATE merch SET title = ?, merchType = ?, quantity = ?, price = ? WHERE id = ?
/* select the merch for the browse page with id */
SELECT id, title, merchType, price, quantity FROM merch WHERE id = (?)
/* select all the merch  */
SELECT id, title, merchType, price FROM merch
/* select merch with certain merch type  */
SELECT id, title, merchType, price FROM merch WHERE merchType = (?)
/* select merch where it has an ID in the array passed in  */
SELECT id, title, merchType, price FROM merch WHERE id IN (?)
/* insert into the orders a new item  */
INSERT INTO orders (ordertype, buyUser) VALUES (?,?)
/* select id from the orders that is the most recent addition  */
SELECT id FROM orders ORDER BY id DESC LIMIT 0, 1
/* insert a new entry into contains that shows the many to many relationshup where the order contains a merch  */
INSERT INTO contains (orderid, merchid, quantity) VALUES (?,?,?)
/* add in the new payment  */
INSERT INTO payment (amount, orderid, buyUser) VALUES (?,?,?)
/* grab the id and type from the orders with the current user to show their orders  */
SELECT id, ordertype FROM orders WHERE buyUser = (?)
/* delete an order when the user wants toxs  */
DELETE FROM orders WHERE id = ?
