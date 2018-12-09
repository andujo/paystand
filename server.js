const bodyParser = require('body-parser');
// require('body-parser-xml')(bodyParser); // I shouldn't use
const express = require('express'),
    app = express();
port = process.env.PORT || 5015;
// app.use(bodyParser.xml()); // I shouldn't use
app.use(bodyParser.text());



const routes = require('./api/routes/routes');
routes(app);

app.listen(port);
console.log('Server listening in port: ' + port);
