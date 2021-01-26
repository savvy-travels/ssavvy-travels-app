UPDATE savvy_travels_airports
SET airport_one = $2, airport_two = $3
WHERE users_id = $1;