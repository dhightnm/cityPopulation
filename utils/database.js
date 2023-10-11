const { Pool } = require('pg');
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const pool = new Pool({
    user: 'example',
    host: 'localhost',
    database: 'example',
    password: 'example',
    port: 5432,
});

let createTable = async () => {
    try {
        const sql = fs.readFileSync(path.join(__dirname, '../schema.sql'), 'utf8');
        const res = await pool.query(sql);
    } catch (err) {
        console.log("ERROR CONNECTING TO DATABASE", err);
    }
};

let populateDatabase = async (filePath) => {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        const [city, state, population] = line.split(',');
        if (!isNaN(population)) {
            try {
                await pool.query(`INSERT INTO city_populations (city, state, population)
                 VALUES ($1, $2, $3)
                 ON CONFLICT (state, city)
                 DO NOTHING`
                 , [city, state, population]);
            } catch (err) {
                console.log("ERROR POPULATING DATABASE", err);
            }
        }
    }
    console.log("Database populated successfully");
};

module.exports = { pool, createTable, populateDatabase };  