DROP DATABASE IF EXISTS airbnb_test;

CREATE DATABASE airbnb_test;

\c airbnb_test;

DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    rentalCity text NOT NULL,
    date text NOT NULL
);