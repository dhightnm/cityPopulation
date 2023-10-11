const fastify = require('fastify')({ logger: true });
const { createTable, populateDatabase } = require('./utils/database');
const populationRoutes = require('./routes/population');

const PORT = 5555;

fastify.register(populationRoutes, { prefix: '/api/population' });

const startServer = async () => {
    await createTable();
    await populateDatabase('./assets/city_populations.csv');

    try {
        await fastify.listen({ port: PORT});
        fastify.log.info(`Server listening on port ${PORT}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

startServer();