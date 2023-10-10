const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5555;


app.use(bodyParser.json());
app.use(bodyParser.text());

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    });