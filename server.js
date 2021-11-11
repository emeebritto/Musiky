const express = require('express');
const path = require('path');
require('dotenv').config();

app = express();

const PORT = process.env.PORT || 3456;

app.use(express.static(`${__dirname}/build/`))

app.route('/*').get(function(req, res) {
    res.sendFile(path.join(__dirname + `/build/index.html`));
});

app.listen(PORT, () => {
    console.log('Started: ' + new Date())
    console.log('port: ' + PORT)
})
