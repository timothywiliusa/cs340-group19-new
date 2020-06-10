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
