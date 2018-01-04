drop table if exists Documents;
drop table if exists Document_META;
drop table if exists Projects;
drop table if exists Logs;
drop table if exists Users;

CREATE TABLE Users (
  user_id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(80) NOT NULL,
  name VARCHAR(50) NOT NULL,
  password VARCHAR(256) NOT NULL,
  salt CHAR(64) NOT NULL,
  PRIMARY KEY (user_id),
  UNIQUE INDEX (email)
);

CREATE TABLE Projects (
  project_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(80) NOT NULL,
  description VARCHAR(256) NOT NULL,
  author VARCHAR(50) NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (project_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Documents (
  document_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL,
  saved_name VARCHAR(60) NOT NULL,
  description VARCHAR(256),
  location VARCHAR(256) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INT NOT NULL,
  PRIMARY KEY (document_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- ONE TO ONE RELATION WITH Document
-- HAS MANY RELATION WITH Segment
CREATE TABLE Document_META (
  document_id INT NOT NULL,
  segment_count INT,
  list_order INT,
  completed_segments INT,
  total_word_count INT,
  PRIMARY KEY (document_id),
  FOREIGN KEY (document_id) REFERENCES Documents(document_id)
);

-- ONE TO ONE RELATION WITH Document_META
CREATE TABLE Segment (
  segment_index INT NOT NULL,
  document_id INT NOT NULL,
  machine_translation VARCHAR(3000),
  edit_mode_time INT,
  tile_mode_time INT,
  voice_mode_time INT,
  total_edit_time INT,
  characters_entered INT,
  words_entered INT,
  mode VARCHAR(20) NOT NULL,
  PRIMARY KEY (document_id, segment_index),
  FOREIGN KEY (document_id) REFERENCES Document_META(document_id)
);

CREATE TABLE Logs (
  document_id VARCHAR(60) NOT NULL,
  description VARCHAR(256),
  location VARCHAR(256) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INT NOT NULL,
  PRIMARY KEY (document_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

INSERT INTO Users VALUES (
  1,
  'daniel.turner@adaptcentre.ie',
  'Daniel Turner',
  'b0d134b61fae004251d11677f1023349d46246da98adad18b8c58efbfc3439803a7aebeb944145ac7e667ebeaeec711fd324ef366a809d14e44919f2c76154c343d9856acb72d23d6883be92061e7a779c24efc4be6cccc4830ef7925ea8bb4e59d7777ace5221164da44355fcfd4cd508de8c9975b1da50227576fb0c81b23a',
  '3413edf6d23afe16edaa98ebfa85612c58f12b7cebaa95d75344227fe7c0debf'
);

INSERT INTO Projects VALUES (
  2,
  'Test Project',
  'This is a test project example',
  'Daniel Turner',
  1
);

-- INSERT INTO Documents VALUES (
--  3,
--  'Test Document',
--  '123456',
--  'This is a test document beloning to test project belonging to user Daniel Turner',
--  '/home/adapt/somePath/fileName.xliff',
--  NOW(),
--  1
-- );
