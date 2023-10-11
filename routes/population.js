const db = require('../utils/database');

async function populationRoutes(fastify) {
    fastify.get('/state/:state/city/:city', async (request, reply) => {
        const { city, state } = request.params;

        try {
            const result = await db.pool.query('SELECT * FROM city_populations WHERE city ILIKE  $1 AND state ILIKE $2', [city, state]);
            if (result.rows.length > 0){
                return { population: result.rows[0].population };
            } else {
                reply.status(400).send({ message: "City/State combination not found" });
            }
        } catch (err) {
            console.log(err);
            reply.status(500).send({ message: "Error fetching population data" });
        }
    });

    fastify.put('/state/:state/city/:city', async (request, reply) => {
        const { city, state } = request.params;
        const population = parseInt(request.body);

        if(isNaN(population)){
            reply.status(400).send({ message: "Invalid population value" });
            return;
        }

        try {
            const updateResult = await db.pool.query(`
                UPDATE city_populations SET population = $3 
                WHERE LOWER(city) = LOWER($1) AND LOWER(state) = LOWER($2)
                RETURNING id
            `, [city, state, population]);

            if(updateResult.rowCount === 0){
                await db.pool.query(`
                    INSERT INTO city_populations(city, state, population)
                    VALUES ($1, $2, $3)
                `, [city, state, population]);
                reply.status(201).send({ message: "Population added for new city-state combination" });
            } else {
                reply.status(200).send({ message: "Population updated for city-state combination" });
            }
        } catch (err) {
            console.log(err);
            reply.status(500).send({ message: "Error updating population data" });
        }
    });
}

module.exports = populationRoutes;
