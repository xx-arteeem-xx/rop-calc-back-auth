// _____________________ ИМПОРТ БИБЛИОТЕК ______________________________________
const express = require('express');
const router = express.Router();
const logger = require("../logger/logger.js");

// ______________ НАСТРОЙКА ПАРАМЕТРОВ МЕТОДА ______________________________
require('dotenv').config();
const pgp = require("pg-promise")();

const dbPath = `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
const db = pgp(dbPath);

// || МЕТОД 1. При переходе на страницу "/api/auth" авторизовываем пользователя ||
// || Пример запроса: 
// {
//     "username": "artemka",
//     "password": "1234"
// }
// || Пример ответа: 
// {
//     "message": "Successfully logged in!",
//     "secretKey": "ndI0_[!g@!ALTaW1M=Tv=5Wa=#dIIn}0"
// }
router.post('/', (req, res) => {
    try {
        let authData = {
            "username": "artemka",
            "password": "1234",
            "secretKey": "ndI0_[!g@!ALTaW1M=Tv=5Wa=#dIIn}0"
        };

        let message = "";
        let secretKey = "";
        let status = 200;

        // _______________ ПРОВЕРЯЕМ ДАННЫЕ ____________________________________
        if ((req.body.username === authData.username) && (req.body.password === authData.password)) {
            message = "Successfully logged in!";
            secretKey = authData.secretKey;
            status = 200;
        } else {
            message = "Username or password incorrect. Please, try again";
            status = 401;
        };
        // _______________ ОТПРАВЛЯЕМ ДАННЫЕ ___________________________________
        res.status(status).json({
            message,
            secretKey
        });
        logger.info({
            "path": req.path,
            "ip": req.ip
        });
        // _______________ ОТПРАВЛЯЕМ ДАННЫЕ ____________________________________
    } catch (error) {
        // _______________ ЕСЛИ НАШЛИ ОШИБКУ ____________________________________
        res.status(400).json({
            "error": error.message
        });
        logger.error({
            "error": error.message,
            "path": req.path,
            "ip": req.ip
        });
    }
});

module.exports = router;