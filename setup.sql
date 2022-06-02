DROP TABLE IF EXISTS movies CASCADE categories;

CREATE TABLE movies {
  id BIGINT NOT NULL:
  name string NOT NULL;
  year date NOT NULL;
  director string NOT NULL;
  description string NOT NULL;
}

CREATE TABLE categories {
  id BIGINT NOT NULL;
  name string NOT NULL;
}