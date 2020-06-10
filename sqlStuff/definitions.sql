/* for second time users
drop table payment;
drop table contains;
drop table orders;
drop table merch;
drop table user;
*/

create table user (
    username    varchar(25)     Primary key,
    passcode    varchar(100)    not null,
    zip         integer(25),
    planetNum   integer(11),
    Xcoord      integer(11),
    Ycoord      integer(11),
    POBox       integer(11)
);
create table merch (
    id          integer(11)     Primary Key auto_increment,
    title       varchar(255)    not null, 
    merchType   varchar(25)     not null,
    price       decimal(38,10)  not null,
    quantity    integer(11)     not null,
    user        varchar(25),
    foreign key(user) references user(username)
);
create table orders (
    id          integer(11)     Primary Key auto_increment,
    ordertype   varchar(255)    not null,
    buyUser     varchar(25),
    foreign key(buyUser) references user(username)
);
create table contains (
    orderid     integer(11),
    merchid     integer(11),
    quantity    integer(11)     not null,
    primary key(orderid, merchid),
    foreign key(orderid) references orders(id),
    foreign key(merchid) references merch(id)
);
create table payment (
    id          integer(11)     Primary key auto_increment,
    amount      decimal(38,10)  not null,
    orderid     integer(11),
    buyUser     varchar(25),
    foreign key(orderid) references orders(id),
    foreign key(buyUser) references orders(buyUser)
);

insert into user
    (username, passcode, zip, planetNum, Xcoord, Ycoord, POBox)
values
    ('bigMan321', 'rj29jh3u',423483, 3, 49403843,33239329,9932),
    ('ISellWeapons', 'ihavedognameddoggy',3321, 32,99878967,88761390,911),
    ('Coolguy420', 'password123',null, null, null,null,null),
    ('nerdsRock!', 'cashcashcashheyoo21',8547, 43, 49403843,99182734,43),
    ('*LivinLikeLarry*', 'superstrongpassword99',48893, 2, 77283920,77865364,12),
    ('23MichaelJordan23', 'MikeJordanisthegoat324',483993, 921, 17283921,77638495,1),
    ('PianosSurplus', '#@*HDHUSifj3h*',49983, 31, 28391023,00106201,314),
    ('noSpaceDrugsHere', 'Icannseeeunderwater',487483, 12, 98271638,53983718,554),
    ('SpaceShipsRUs', 'wh38hfja4',667643, 2, 748293053,48437474,43),
    ('SecretMapGuy', 'fh3f8h834h',889383, 1, 93736489,65473473,88);

insert into merch
    (title,price,merchType,quantity,user)
values
    ('Big gun',432.33,'Weapon',900,'ISellWeapons'),
    ('Easy Hacking program! GET RICH FAST!',999.99,'Program',9999,'nerdsRock!'),
    ('Walnut Piano',10000,'Weapon',12,'PianosSurplus'),
    ('Turbo Thrusters Blueprint! Fly Lightspeed!',99999,'Blueprint',500,'SpaceShipsRUs'),
    ('RailGun attachment (Install manual included)',8384,'Weapon',23,'SpaceShipsRUs'),
    ('Splinter Bomb (Dark Matter not included)',400,'Weapon',21,'ISellWeapons'),
    ('EASY DIY HOMEMADE GUN BLUEPRINT',90,'Blueprint',3243,'ISellWeapons'),
    ('Beethovens music but in binary!',10,'Music', 9999, 'PianosSurplus'),
    ('Robot shark, great for kids! BRAND NEW! (Has lazers)',3500,'Toy', 35, 'noSpaceDrugsHere'),
    ('Super potent stardust extract - Best in the Galaxy!',99.99, 'Material', 2424, 'noSpaceDrugsHere');


insert into orders
    (id,ordertype,buyUser)
values
    (1,'Physical','bigMan321'),
    (2,'Digital','bigMan321'),
    (3,'Physical','bigMan321'),
    (4,'Physical','nerdsRock!'),
    (5,'Digital','SecretMapGuy'),
    (6,'Digital','23MichaelJordan23'),
    (7,'Physical','bigMan321'),
    (8,'Physical','PianosSurplus'),
    (9,'Digital','bigMan321'),
    (10,'Digital','SecretMapGuy');

insert into contains
    (orderid,merchid,quantity)
values
    (1,1,1),
    (2,2,10),
    (3,1,2),
    (4,3,3),
    (5,1,10),
    (6,4,1),
    (7,5,1),
    (8,6,2),
    (9,7,1),
    (10,3,1);

insert into payment
    (amount,orderid,buyUser)
values
    (999.99,1,'bigMan321'),
    (1.54349,2,'bigMan321'),
    (0.0932,3,'bigMan321'),
    (34.09,4,'nerdsRock!'),
    (110032.01,5,'SecretMapGuy'),
    (80.89,6,'23MichaelJordan23'),
    (342.10,7,'bigMan321'),
    (0.19,8,'PianosSurplus'),
    (55.99,9,'bigMan321'),
    (5424.30, 10,'SecretMapGuy');
