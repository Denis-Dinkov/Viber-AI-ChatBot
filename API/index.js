const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/viberBot');

fs.readdirSync(path.join(__dirname, 'routes')).forEach(file => {
    const route = require(`./routes/${file}`);
    const routePath = `/${path.parse(file).name}`;
    app.use(routePath, route);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});