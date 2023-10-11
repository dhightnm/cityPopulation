const { Pool } = require('pg');
const fs = require('fs');
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
        console.log("Error with the schema", res);
    } catch (err) {
        console.log(err);
    }
}

module.exports = { pool, createTable};  