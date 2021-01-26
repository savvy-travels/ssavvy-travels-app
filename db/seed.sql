DROP TABLE IF EXISTS savvy_travels_locations;
DROP TABLE IF EXISTS savvy_travels_airports;
DROP TABLE IF EXISTS savvy_travels_users;


create table savvy_travels_users (
id SERIAL PRIMARY KEY,
email VARCHAR(100),
username VARCHAR(100),
password VARCHAR(500),
preferred VARCHAR(50)
);

CREATE TABLE savvy_travels_locations (
id SERIAL PRIMARY key,
users_id INTEGER references savvy_travels_users(id),
location text
);

CREATE TABLE savvy_travels_airports (
id SERIAL PRIMARY KEY,
users_id INTEGER references savvy_travels_users(id),
airport_one VARCHAR(50),
airport_two VARCHAR(50)
);