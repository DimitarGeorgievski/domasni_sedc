SELECT * FROM movies;
SELECT * FROM actors;
SELECT * FROM genres;
SELECT * FROM directors;
SELECT * FROM reviews;
SELECT * FROM production_companies;

--  Find all movies released in 2019
SELECT * FROM movies
WHERE release_date >= '2019-01-01' AND release_date < '2020-01-01';

-- Find all actors from 'British' nationality
SELECT * FROM actors
WHERE nationality ILIKE 'british';

-- Find all movies with 'PG-13' rating
SELECT * FROM movies
WHERE rating = 'PG-13';

-- Find all directors from 'American' nationality
SELECT * FROM directors
WHERE nationality = 'American';

-- Find all movies with duration more than 150 minutes
SELECT * FROM movies
WHERE duration_minutes > 150;

-- Find all actors with last name 'Pitt'
SELECT * FROM actors
WHERE last_name = 'Pitt';

-- Find all movies with budget greater than 100 million
SELECT * FROM movies
WHERE budget > 100000000;

-- Find all reviews with rating 5
SELECT * FROM reviews
WHERE rating = 5; -- nema nikakov podatok sto ima rating 5

-- Find all movies in English language
SELECT * FROM movies
WHERE language = 'English';

-- Find all production companies from 'California'
SELECT * FROM production_companies
WHERE headquarters LIKE '%California';

-- EXTRA HOMEWORK (2/3, 3/3)

-- Show movies and their directors
SELECT title,first_name,last_name
FROM movies
JOIN directors ON movies.director_id = directors.director_id; -- kako sto sfativ JOIN se koristi za da vleze i druga tabela,a so ON se dava uslov kade sto barame uslov dvete ID-inja da se isti vo 2te tabeli

-- Show actors and their movies

SELECT first_name,last_name -- za ova probav da najdam kade ima ID od akterite vo filmovi i vo site drugi tabeli, no ne najdov nisto takvo pa go ostaviv

-- zabeleska: probav da gi napravam i drugite domasna no sfativ na kraj deka ne se tocnite tabeli za zhal, no sepak ako mozi poteski domasni oti prviot del e prelesen

