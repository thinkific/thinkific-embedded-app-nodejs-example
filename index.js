const path = require('path');
const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

const rootRoutes = require('./routes/root');
const installRoutes = require('./routes/install');

const { base64EncodeUrlSafe } = require('./utils/utils');

require('dotenv').config();

const app = express();

global.codeVerifier = base64EncodeUrlSafe(crypto.randomBytes(32));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use('/', rootRoutes);
app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
  })
);
app.use('/install', installRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page not found', path: '/404' });
});

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((_) => {
    app.listen(process.env.PORT || 3001);
  })
  .catch((err) => console.error(err));
