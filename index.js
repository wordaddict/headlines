const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(__dirname + '/'));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

let port = 7100;

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});