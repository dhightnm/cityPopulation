const express = require('express');
const router = express.Router();
const db = require('../utils/database');

router.get('/state/:state/city/:city', async (req, res) => {
    const { city, state} = req.params;

    try {
        const result = await db.pool.query('SELECT * FROM city_populations WHERE city ILIKE  $1 AND state ILIKE $2', [city, state]);
        if (result.rows.length > 0){
            res.status(200).json({ population: result.rows[0].population });
        } else {
            res.status(400).json({ message: "City/State combination not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching population data" });
    }
});

router.put('/state/:state/city/:city', async (req, res) => {
    const { city, state } = req.params;
    const population = parseInt(req.body);

    if(isNaN(population)){
        return res.status(400).json({ message: "Invalid population value" });
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
            return res.status(201).json({ message: "Population added for new city-state combination" });
        } else {
            return res.status(200).json({ message: "Population updated for city-state combination" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error updating population data" });
    }
});
module.exports = router;