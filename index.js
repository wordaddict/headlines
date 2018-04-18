const express = require('express');
const path = require('path');

const port = process.env.PORT || 7100;

const app = express();

app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(__dirname + '/'));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});