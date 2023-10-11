const express = require('express');
const router = express.Router();
const db = require('../utils/database');

router.get('/state/:state/city/:city', async (req, res) => {
    const { city, state} = req.params;

    try {
        const result = await db.pool.query('SELECT * FROM city_populations WHERE city = $1 AND state = $2', [city, state]);
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

module.exports = router;