INSERT INTO savvy_travels_airports (users_id, airport_one, airport_two)
VALUES ($1, $2, $3)
returning airport_one, airport_two;