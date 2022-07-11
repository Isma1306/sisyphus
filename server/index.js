require('dotenv').config();
const Express = require('express');
const session = require('express-session');
const cors = require('cors');
const db = require('./models/db');

const { router } = require('./routes/router');

const PORT = process.env.PORT;
const corsConfig = {
  origin: 'http://localhost:4200',
  credentials: true,
};

const app = new Express();
app.use(cors(corsConfig));
app.set('trust proxy', 1); // trust first proxy

app.use(
  session({
    name: 'sessionId',
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // should be true when deploy
      sameSite: 'lax',
      httpOnly: false, // should be true when deploy
    },
  })
);
app.use(Express.static('public'));
app.use(Express.json());
app.use(router);

(async function bootstrap() {
  try {
    await db.sequelize.sync({ force: false });
    app.listen(PORT, console.log(`Listen in http://localhost:${PORT}`));
  } catch (error) {
    console.log(error);
  }
})();
