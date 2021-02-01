INSERT INTO savvy_travels_users(email, username, password, preferred)
VALUES ($1, $2, $3, $4)
returning username, preferred, id;