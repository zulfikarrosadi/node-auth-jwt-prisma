const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const requireAuth = require('./middlewares/authMiddleware');
const authRoutes = require('./routes/authRoutes');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);

app.listen(3000);
