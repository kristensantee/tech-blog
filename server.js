const express = require('express');
const session = require('express-session');
const routes = require('./routes');
const exphbs = require('express-handlebars');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const path = require('path');

require('dotenv').config();

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'super secret time',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const hbs = exphbs.create({});
app.use(express.static('public'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.get('/', (req,res) => {
    res.render('home',
    // {
    //     logged_in:req.session.logged_in
    // }
    );
    }
);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening on 3001'));
  });