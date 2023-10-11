CREATE TABLE IF NOT EXISTS city_populations (
    id SERIAL PRIMARY KEY,
    state VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    population INTEGER NOT NULL,
    CONSTRAINT unique_city_state UNIQUE (state, city)
);