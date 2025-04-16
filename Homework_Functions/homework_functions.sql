SELECT * FROM movies;
SELECT * FROM directors;
SELECT * FROM movie_awards;
SELECT * FROM movie_revenues;
SELECT * FROM actors;
SELECT * FROM actor_awards;
SELECT * FROM awards;
SELECT * FROM genres;
SELECT * FROM cast_members;
SELECT * FROM movie_genres;
SELECT * FROM movie_locations;
SELECT * FROM users;
SELECT * FROM user_watchlist;
SELECT * FROM reviews;
SELECT * FROM movie_production_companies;
SELECT * FROM production_companies;

-- Find average rating per movie
CREATE OR REPLACE FUNCTION average_rating_movies()
RETURNS TABLE(
	movie_title VARCHAR,
	average_rating DECIMAL
)
LANGUAGE plpgsql
AS $$
BEGIN
	RETURN QUERY
	SELECT 
		m.title,
		ROUND(AVG(r.rating),2) AS average_rating
	FROM movies m
	INNER JOIN reviews r ON m.movie_id = r.movie_id
	GROUP BY m.movie_id,m.title;
END;
$$;

DROP FUNCTION average_rating_movies();
SELECT * FROM average_rating_movies();

-- Create and query a temp table with movies where total revenue (domestic plus international) is greated than 100000000
CREATE OR REPLACE FUNCTION movies_total_revenue_100m()
RETURNS TABLE(
	movie_title VARCHAR,
	total_revenue NUMERIC
)
LANGUAGE plpgsql
AS $$
BEGIN
	RETURN QUERY
	SELECT
		m.title,
		ROUND(SUM(mr.domestic_revenue + mr.international_revenue)) AS total_revenue
	FROM movies m
	INNER JOIN movie_revenues mr ON m.movie_id = mr.movie_id
	GROUP BY m.movie_id, m.title
	HAVING SUM(mr.domestic_revenue + mr.international_revenue) > 100e6;
END;
$$;

DROP FUNCTION movies_total_revenue_100m();
SELECT * FROM movies_total_revenue_100m();

-- Create a function to get average rating of a movie by title

CREATE OR REPLACE FUNCTION average_rating_movies(
	movie_title_input VARCHAR
)
RETURNS TABLE(
	movie_title VARCHAR,
	average_rating DECIMAL
)
LANGUAGE plpgsql
AS $$
BEGIN
	RETURN QUERY
	SELECT
		m.title,
		ROUND(AVG(r.rating), 2) AS average_rating
	FROM movies m
	INNER JOIN reviews r ON m.movie_id = r.movie_id
	WHERE m.title = movie_title_input
	GROUP BY m.movie_id, m.title;
END;
$$;

DROP FUNCTION average_rating_movies();
SELECT * FROM average_rating_movies('Inception');

-- Find the top 5 actors with most movie appearances
CREATE OR REPLACE FUNCTION actors_most_appearances()
RETURNS TABLE(
	actor_name VARCHAR,
	movie_appearances BIGINT
)
LANGUAGE plpgsql
AS $$
BEGIN
	RETURN QUERY
	SELECT 
		a.first_name,
		COUNT(cm.actor_id) AS movie_appearances
	FROM actors a
	INNER JOIN cast_members cm ON a.actor_id = cm.actor_id
	GROUP BY a.actor_id,a.first_name
	ORDER BY movie_appearances DESC
	LIMIT 5;
END;
$$;

DROP FUNCTION actors_most_appearances();
SELECT * FROM actors_most_appearances();

-- Show all user emails in lowercase
CREATE OR REPLACE FUNCTION user_lowercase_emails()
RETURNS TABLE(
	username VARCHAR,
	email TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
	RETURN QUERY
	SELECT
		u.username,
		LOWER(u.email)
	FROM users u;
END;
$$;

DROP FUNCTION user_lowercase_emails();
SELECT * FROM user_lowercase_emails();

-- Show year of release for each movie
CREATE OR REPLACE FUNCTION movies_release_year()
RETURNS TABLE(
	movie_title VARCHAR,
	movie_release_year NUMERIC
)
LANGUAGE plpgsql
AS $$
BEGIN
	RETURN QUERY
	SELECT
		m.title,
		EXTRACT(YEAR FROM m.release_date)
	FROM movies m;
END;
$$;

DROP FUNCTION movies_release_year();
SELECT * FROM movies_release_year();

-- Round domestic revenue to nearest dollar
CREATE OR REPLACE FUNCTION movies_domestic_revenues()
RETURNS TABLE(
	movie_title VARCHAR,
	movie_domestic_revenue NUMERIC
)
LANGUAGE plpgsql
AS $$
BEGIN
	RETURN QUERY
	SELECT
		m.title,
		ROUND(mr.domestic_revenue) AS domestic_revenue
	FROM movies m
	INNER JOIN movie_revenues mr ON m.movie_id = mr.movie_id
	GROUP BY m.movie_id, m.title,mr.domestic_revenue;
END;
$$;

DROP FUNCTION movies_domestic_revenues();
SELECT * FROM movies_domestic_revenues();

-- Count how many reviews each movie has
CREATE OR REPLACE FUNCTION movies_total_reviews()
RETURNS TABLE(
	movie_title VARCHAR,
	movie_review_count BIGINT
)
LANGUAGE plpgsql
AS $$
BEGIN
	RETURN QUERY
	SELECT
		m.title,
		COUNT(r.review_id) AS total_reviews
	FROM movies m
	INNER JOIN reviews r ON m.movie_id = r.movie_id
	GROUP BY m.movie_id, m.title
	ORDER BY total_reviews DESC;
END;
$$;

DROP FUNCTION movies_total_reviews();
SELECT * FROM movies_total_reviews();

-- Show full name of all actors (first + last name)
CREATE OR REPLACE FUNCTION actors_fullname()
RETURNS TABLE(
	actor_name TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
	RETURN QUERY
	SELECT
		a.first_name || ' ' || a.last_name AS actor_name
	FROM actors a;
END;
$$;

DROP FUNCTION actors_fullname();
SELECT * FROM actors_fullname();

--Get total number of movies directed by a specific director CREATE OR REPLACE FUNCTION count_movies_by_director(director_name TEXT) (Custom Function That Returns a Single Value) 
CREATE OR REPLACE FUNCTION total_number_movies_directed_by_director(
	director_name TEXT
)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
BEGIN
	RETURN(
	SELECT
		COUNT(*) AS total_movies_directed 
	FROM movies m
	INNER JOIN directors d ON m.director_id = d.director_id
	WHERE d.first_name = director_name
	);
END;
$$;

DROP FUNCTION total_number_movies_directed_by_director();
SELECT * FROM total_number_movies_directed_by_director('Martin');

-- Get all movies with rating above a certain number (Custom Function That Returns a Table)
CREATE OR REPLACE FUNCTION movies_above_rating(
	movie_rating_input NUMERIC
)
RETURNS TABLE(
	movie_title VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
	RETURN QUERY
	SELECT
		m.title
	FROM movies m
	INNER JOIN reviews r ON m.movie_id = r.movie_id
	WHERE movie_rating_input < r.rating;
END;
$$;

DROP FUNCTION movies_above_rating();
SELECT * FROM movies_above_rating(9);