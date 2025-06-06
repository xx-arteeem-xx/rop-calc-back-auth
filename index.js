// _____________________ ИМПОРТ БИБЛИОТЕК ______________________________________
const express = require('express');
require('dotenv').config();
const pgp = require("pg-promise")();
const cors = require("cors");

// _____________________ ИМПОРТ ПУТЕЙ _________________________________________
const getRoute = require('./routes/getRoute.js');
const loginRoute = require('./routes/loginRoute.js');

// ______________ НАСТРОЙКА ПАРАМЕТРОВ ПРИЛОЖЕНИЯ ______________________________
const dbPath = `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
const db = pgp(dbPath);
const port = 4000;
const corsOptions ={
    origin: '*', 
    credentials: true,
    optionSuccessStatus: 200,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

// ________________________ МЕТОДЫ ____________________________________________
app.use('/api', getRoute);
app.use('/api/auth', loginRoute);

// _____________________ ЗАПУСК ПРИЛОЖЕНИЯ _____________________________________
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});