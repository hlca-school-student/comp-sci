const express = require('express');
const debug = require('debug');
const morgan = require('morgan');
const path = require('path');
const PORT = 5051;

const app = express();

app.use(morgan('dev'));

app.use('/public', express.static(path.join(__dirname, 'public')));

// render index.html
app.get('/',function(req,res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
    debug(`listening on port: ${PORT}`)
})
