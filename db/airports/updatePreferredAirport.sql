UPDATE savvy_travels_users
SET preferred = $2
WHERE id = $1
returning preferred;