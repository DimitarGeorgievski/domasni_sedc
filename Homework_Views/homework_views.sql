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

-- Create a view that shows top-rated movies. Include: movie title, average rating, review count, director name
CREATE VIEW top_rated_movies AS
SELECT 
	m.title,
	ROUND(AVG(r.rating), 1) AS average_rating, 
	COUNT(r.review_id) AS review_count,d.first_name
FROM movies m
INNER JOIN reviews r ON m.movie_id = r.movie_id
INNER JOIN directors d ON m.director_id = d.director_id
GROUP BY m.movie_id,m.title,d.director_id
ORDER BY average_rating DESC;

SELECT * FROM top_rated_movies;

-- Create a view for movie financial performance. Include: movie title, budget,total revenue, profit, ROI
CREATE VIEW movie_financial_performance AS
SELECT 
	m.title, 
	ROUND(m.budget) || '$' AS movie_budget, 
	ROUND(SUM(mr.domestic_revenue + mr.international_revenue)) || '$' AS total_revenue,
	ROUND(SUM(mr.domestic_revenue + mr.international_revenue) - m.budget) || '$' AS movie_profit,
	ROUND((SUM((mr.domestic_revenue + mr.international_revenue) - m.budget)/m.budget), 5) AS ROI
FROM movies m
INNER JOIN movie_revenues mr ON m.movie_id = mr.movie_id
GROUP BY m.title,m.budget;

SELECT * FROM movie_financial_performance;

-- Create a view for actor filmography. Include: actor name, movie count, genre list, total revenue
CREATE VIEW actor_filmography AS
SELECT 
	a.first_name,
	COUNT(m.movie_id) AS movie_count,
	STRING_AGG(DISTINCT g.name,', ') AS genre_list,
	ROUND(SUM(mr.domestic_revenue + mr.international_revenue)) || '$' AS total_revenue
FROM actors a
INNER JOIN cast_members cm ON a.actor_id = cm.actor_id
INNER JOIN movies m ON cm.movie_id = movies.movie_id
INNER JOIN movie_genres mg ON movies.movie_id = mg.movie_id
INNER JOIN genres g ON mg.genre_id = g.genre_id
INNER JOIN movie_revenues mr ON movies.movie_id = mr.movie_id
GROUP BY a.actor_id,a.first_name;

SELECT * FROM actor_filmography;

-- Create a view for genre statistics. Include: genre name, movie count, average rating, total revenue
CREATE VIEW genre_statistics AS
SELECT
	g.name,
	COUNT(m.movie_id) AS movie_count,
	ROUND(AVG(r.rating), 3) AS average_rating,
	ROUND(SUM(mr.domestic_revenue + mr.international_revenue)) || '$' AS total_revenue
FROM genres g
INNER JOIN movie_genres mg ON g.genre_id = mg.genre_id
INNER JOIN movies m ON mg.movie_id = m.movie_id
INNER JOIN reviews r ON m.movie_id = r.movie_id
INNER JOIN movie_revenues mr ON m.movie_id = mr.movie_id
GROUP BY g.genre_id, g.name;

SELECT * FROM genre_statistics;
DROP VIEW genre_statistics;

-- Create a view for production company performance. Include: company name, movie count, total investment, total revenue
CREATE VIEW production_company_performance AS
SELECT
	pc.name,
	COUNT(m.movie_id) AS movie_count,
	ROUND(SUM(mpc.investment_amount)) || '$' AS total_investment,
	ROUND(SUM(mr.domestic_revenue + mr.international_revenue)) || '$' AS total_revenue
FROM production_companies pc
INNER JOIN movie_production_companies mpc ON pc.company_id = mpc.company_id
INNER JOIN movies m ON mpc.movie_id = m.movie_id
INNER JOIN movie_revenues mr ON m.movie_id = mr.movie_id
GROUP BY pc.company_id,pc.name;

SELECT * FROM production_company_performance;
DROP VIEW production_company_performance;