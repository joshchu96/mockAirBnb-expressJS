DROP DATABASE IF EXISTS airbnb;

CREATE DATABASE airbnb;

\c airbnb;

DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    rentalCity text NOT NULL,
    date text NOT NULL
);

INSERT INTO users
    (name, rentalCity, date)
VALUES
    ('Josh', 'Tokyo', '09-18-2024');

INSERT INTO users
    (name, rentalCity, date)
VALUES
    ('Shania', 'Taichung', '09-01-2024');

INSERT INTO users
    (name, rentalCity, date)
VALUES
    ('Roaring Kitty', 'New York City', '06-07-2024');



