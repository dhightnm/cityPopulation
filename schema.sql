CREATE TABLE IF NOT EXISTS city_populations (
    id SERIAL PRIMARY KEY,
    state VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    population INTEGER NOT NULL,
    CONSTRAINT unique_city_state UNIQUE (state, city)
);

CREATE INDEX IF NOT EXISTS idx_city_state ON city_populations (LOWER(city), LOWER(state));