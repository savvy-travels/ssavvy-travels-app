DROP TABLE IF EXISTS savvy_travels_locations;
DROP TABLE IF EXISTS savvy_travels_users;


create table savvy_travels_users (
id SERIAL PRIMARY KEY,
email VARCHAR(100),
username VARCHAR(100),
password VARCHAR(500),
preferred VARCHAR(50),
active boolean
);

ALTER TABLE savvy_travels_users 
ALTER COLUMN active
SET DEFAULT FALSE;

CREATE TABLE savvy_travels_locations (
id SERIAL PRIMARY key,
users_id INTEGER references savvy_travels_users(id),
location TEXT,
airport TEXT,
dates TEXT,
created timestamptz default now()
);