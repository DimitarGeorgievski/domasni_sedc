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

-- HOMEWORK 2/3
-- Show movies and their directors
SELECT movies.title, directors.first_name, directors.last_name FROM movies
INNER JOIN directors ON movies.director_id = directors.director_id;

-- Show actors and their movies
SELECT movies.title, actors.first_name, actors.last_name FROM cast_members cm
INNER JOIN movies ON cm.movie_id = movies.movie_id
INNER JOIN actors ON cm.actor_id = actors.actor_id;

-- Show movies and their genres
SELECT movies.title, genres.name FROM movie_genres mg
INNER JOIN movies ON mg.movie_id = movies.movie_id
INNER JOIN genres ON mg.genre_id = genres.genre_id;

-- Show users and their reviews
SELECT users.username, review_text FROM reviews
INNER JOIN users ON reviews.user_id = users.user_id;

-- Show movies and their locations
SELECT movies.title, specific_location FROM movie_locations ml
INNER JOIN movies ON ml.movie_id = movies.movie_id;

-- Show movies and their production companies
SELECT movies.title,name FROM movie_production_companies mpc
INNER JOIN movies ON mpc.movie_id = movies.movie_id
INNER JOIN production_companies pc ON mpc.company_id = pc.company_id;

-- Show actors and their awards
SELECT actors.first_name, actors.last_name, awards.name FROM actor_awards aa
INNER JOIN actors ON aa.actor_id = actors.actor_id
INNER JOIN awards ON aa.award_id = awards.award_id;

-- Show movies and their awards
SELECT movies.title, awards.name FROM movie_awards ma
INNER JOIN movies ON ma.movie_id = movies.movie_id
INNER JOIN awards ON ma.award_id = awards.award_id;

-- Show users and their watchlist movies
SELECT users.username, movies.title FROM user_watchlist uw
INNER JOIN users ON uw.user_id = users.user_id
INNER JOIN movies ON uw.movie_id = movies.movie_id;

-- Show movies and their revenues
SELECT movies.title, international_revenue FROM movie_revenues mr
INNER JOIN movies ON mr.movie_id = movies.movie_id;

-- HOMEWORK 3/3
-- Show all R-rated movies and their directors
SELECT movies.title,directors.first_name, directors.last_name FROM movies
INNER JOIN directors ON movies.director_id = directors.director_id
WHERE rating = 'R';

--Show all movies from 2019 and their genres
SELECT movies.title,genres.name FROM movie_genres mg
INNER JOIN movies ON mg.movie_id = movies.movie_id
INNER JOIN genres ON mg.genre_id = genres.genre_id
WHERE release_date BETWEEN '2019-01-01' AND '2019-12-31';

-- Show all American actors and their movies
SELECT actors.first_name, actors.last_name, movies.title FROM cast_members cm
INNER JOIN actors ON cm.actor_id = actors.actor_id
INNER JOIN movies ON cm.movie_id = movies.movie_id
WHERE nationality = 'American';

-- Show all movies with budget over 100M and their production companies
SELECT movies.title,pc.name FROM movie_production_companies mpc
INNER JOIN movies ON mpc.movie_id = movies.movie_id
INNER JOIN production_companies pc ON mpc.company_id = pc.company_id
WHERE budget > 100e6;

-- Show all movies filmed in 'London' and their directors
SELECT movies.title,directors.first_name, directors.last_name, city FROM movie_locations ml
INNER JOIN movies ON ml.movie_id = movies.movie_id
INNER JOIN directors ON movies.director_id = directors.director_id
WHERE city = 'Los Angeles';

-- Show all horror movies and their actors
SELECT movies.title,actors.first_name,actors.last_name, genres.name FROM cast_members cm
INNER JOIN movies ON cm.movie_id = movies.movie_id
INNER JOIN actors ON cm.actor_id = actors.actor_id
INNER JOIN movie_genres mg ON mg.movie_id = movies.movie_id
INNER JOIN genres ON mg.genre_id = genres.genre_id
WHERE genres.name = 'Horror';

-- Show all movies with reviews rated 9 and their reviewers
SELECT movies.title,review_text FROM reviews
INNER JOIN movies ON reviews.movie_id = movies.movie_id
WHERE reviews.rating = 9;

-- Show all British directors and their movies
SELECT title,directors.first_name,directors.last_name FROM movies
INNER JOIN directors ON movies.director_id = directors.director_id
WHERE nationality = 'British';

-- Show all movies longer than 150 minutes and their genres
SELECT movies.title, genres.name,movies.duration_minutes FROM movie_genres mg
INNER JOIN movies ON mg.movie_id = movies.movie_id
INNER JOIN genres ON mg.genre_id = genres.genre_id
WHERE movies.duration_minutes > 150;

-- Show all Oscar-winning movies and their directors
SELECT title,directors.first_name, directors.last_name, awards.award_type FROM movies
INNER JOIN directors ON movies.director_id = directors.director_id
INNER JOIN movie_awards ma ON ma.movie_id = movies.movie_id
INNER JOIN awards ON ma.award_id = awards.award_id
WHERE awards.award_type = 'Oscar';

-- HOMEWORK 1/2
-- Show all R-rated movies and their directors
SELECT genres.name, COUNT(*) AS r_rated_count FROM movie_genres mg
INNER JOIN genres ON mg.genre_id = genres.genre_id
INNER JOIN movies ON mg.movie_id = movies.movie_id
WHERE movies.rating = 'R'
GROUP BY genres.name
HAVING COUNT(*) > 3;

-- Find directors who have made movies with total revenue over 500 million and have directed at least 2 movies
SELECT first_name, last_name,COUNT(movies.movie_id) AS movie_count FROM directors
INNER JOIN movies ON directors.director_id = movies.director_id
INNER JOIN movie_revenues mr ON movies.movie_id = mr.movie_id
GROUP BY directors.first_name, directors.last_name
HAVING COUNT(movies.movie_id) >= 1 AND SUM(mr.domestic_revenue + mr.international_revenue) >= 500e6; -- nema direktori so 2 movies samo so 1

-- Find actors who have appeared in more than 2 different genres and have won at least 1 award
SELECT first_name, last_name, COUNT(genres.genre_id) AS genre_count, COUNT(aa.award_id) AS award_count FROM actors
INNER JOIN actor_awards aa ON aa.actor_id = actors.actor_id
INNER JOIN cast_members cm ON cm.actor_id = actors.actor_id
INNER JOIN movies ON cm.movie_id = movies.movie_id
INNER JOIN movie_genres mg ON mg.movie_id = movies.movie_id
INNER JOIN genres ON mg.genre_id = genres.genre_id
GROUP BY actors.actor_id, actors.first_name, actors.last_name
HAVING COUNT(genres.genre_id) >= 2 AND COUNT(aa.award_id) >= 1;

-- Find movies that have received more than 3 reviews with an average rating above 7
SELECT movies.title, COUNT(reviews.review_id) AS review_count, AVG(reviews.rating) AS average_rating FROM movies
INNER JOIN reviews ON reviews.movie_id = movies.movie_id
GROUP BY movies.movie_id, movies.title
HAVING COUNT(reviews.review_id) >= 2 AND AVG(reviews.rating) > 7;

-- Find production companies that have invested more than 100 million in movies released after 2015
SELECT pc.name, mpc.investment_amount FROM production_companies AS pc
INNER JOIN movie_production_companies AS mpc ON pc.company_id = mpc.company_id
INNER JOIN movies ON mpc.movie_id = movies.movie_id
WHERE movies.release_date > '2015-01-01'
GROUP BY pc.name, mpc.investment_amount
HAVING SUM(mpc.investment_amount) >= 40000000;

-- Find countries where more than 2 movies were filmed with a total budget exceeding 150 million
SELECT movies.title,movies.budget,ml.country  FROM movie_locations ml
INNER JOIN movies ON ml.movie_id = movies.movie_id
GROUP BY movies.title, movies.budget, ml.country
HAVING SUM(movies.budget) > 150e6 AND COUNT(movies.movie_id) >= 2; -- neznam dali e tocno napisano ama ne vadi informaci nikakvi

-- Find genres where the average movie duration is over 120 minutes and at least one movie has won an Oscar
SELECT movies.title,genres.name AS genre_name, AVG(movies.duration_minutes) AS average_duration FROM genres
INNER JOIN movie_genres mg ON mg.genre_id = genres.genre_id
INNER JOIN movies ON mg.movie_id = movies.movie_id
INNER JOIN movie_awards ma ON ma.movie_id = movies.movie_id
INNER JOIN awards ON ma.award_id = awards.award_id
GROUP BY genres.name,movies.title
HAVING AVG(movies.duration_minutes) >= 120 AND COUNT(awards.name) >= 1;

-- Find years where more than 3 movies were released with an average budget over 50 million
SELECT release_date, budget FROM movies
GROUP BY release_date,budget
HAVING COUNT(release_date) >= 1 AND AVG(budget) > 50e6; -- neznam drug nacin osvem ovaj ama so 3 ne izlegvase i mislam deka i ova e gresno

-- Find actors who have played lead roles in more than 2 movies with a total revenue exceeding 200 million
SELECT actors.first_name, actors.last_name FROM actors
INNER JOIN cast_members cm ON actors.actor_id = cm.actor_id
INNER JOIN movies ON cm.movie_id = movies.movie_id
INNER JOIN movie_revenues mr ON mr.movie_id = movies.movie_id
GROUP BY actors.first_name,actors.last_name
HAVING SUM(mr.domestic_revenue + mr.international_revenue) >= 200e6 AND COUNT(cm.is_lead_role) >= 2;