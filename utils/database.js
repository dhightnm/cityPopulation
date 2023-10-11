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
        const [state, city, population] = line.split(',');
        if (!isNaN(population)) {
            try {
                await pool.query('INSERT INTO city_populations (state, city, population) VALUES ($1, $2, $3)', [state, city, population]);
                console.log("Database populated successfully");
            } catch (err) {
                console.log("ERROR POPULATING DATABASE", err);
            }
        }
    }
};

module.exports = { pool, createTable, populateDatabase };  