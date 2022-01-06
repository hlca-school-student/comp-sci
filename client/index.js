const express = require('express');
const debug = require('debug');
const morgan = require('morgan');
const PORT = 5051;

const app = express();

app.use(morgan('dev'));

// render index.html
app.get('/',function(req,res) {
    res.sendFile('index.html');
});

app.listen(PORT, () => {
    debug(`listening on port: ${PORT}`)
})
