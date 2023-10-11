const express = require('express');
const bodyParser = require('body-parser');
const { createTable, populateDatabase } = require('./utils/database');

const app = express();
const PORT = 5555;


app.use(bodyParser.json());
app.use(bodyParser.text());

const startServer = async () => {
    await createTable();
    await populateDatabase('./assets/city_populations.csv');

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    });
}

startServer();