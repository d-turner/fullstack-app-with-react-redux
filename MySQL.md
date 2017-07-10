# Notes

### mysqladmin
Used to manage users

### Login

#### Normal user
mysql -u username -p

#### Admin user
sudo mysql -p

### Commands
SHOW DATABASES;
USE database_name;
SHOW TABLES;

SHOW FIELDS from table_name;

DROP TABLE table_name;

ALTER TABLE table_name
MODIFY COLUMN column_name datatype;

ALTER TABLE table_name
DROP COLUMN column_name;

### Creating Table
CREATE TABLE Users (
  user_id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(80) NOT NULL,
  name VARCHAR(50) NOT NULL,
  password VARCHAR(256) NOT NULL,
  salt CHAR(64) NOT NULL,
  PRIMARY KEY (user_id),
  UNIQUE INDEX (email)
);

### Quick commands
INSERT INTO Users VALUES (
  1,
  'daniel.turner@adaptcentre.ie',
  'Daniel Turner',
  'b0d134b61fae004251d11677f1023349d46246da98adad18b8c58efbfc3439803a7aebeb944145ac7e667ebeaeec711fd324ef366a809d14e44919f2c76154c343d9856acb72d23d6883be92061e7a779c24efc4be6cccc4830ef7925ea8bb4e59d7777ace5221164da44355fcfd4cd508de8c9975b1da50227576fb0c81b23a',
  '3413edf6d23afe16edaa98ebfa85612c58f12b7cebaa95d75344227fe7c0debf'
);

SELECT * FROM Users WHERE email = 'some_email' limit 1;
