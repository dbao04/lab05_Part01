require('dotenv').config();
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const db = require('./config/db');
db.connect();

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'layout'); // file views/layout.ejs


app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});


app.use((req, res, next) => {
    res.locals.currentUser = req.session.user || null;
    next();
});

app.use('/', require('./routes/index'));
app.use('/suppliers', require('./routes/suppliers'));
app.use('/products', require('./routes/products'));
app.use('/auth', require('./routes/auth'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));