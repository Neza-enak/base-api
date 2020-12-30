const bodyParser = require('body-parser');
const Express = require('express');

const db = require('./models');
const routes = require('./routes');

const app = Express();
const port = process.env.PORT || "4001";

app.use(bodyParser.json());
app.use('/api', routes);

db.sequelize.sync();

app.listen(port);

module.exports = app;