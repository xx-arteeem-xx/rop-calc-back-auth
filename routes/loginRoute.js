const express = require('express');
const router = express.Router();
const logger = require("../logger/logger.js");

// || МЕТОД 1. При переходе на страницу "/api/auth" авторизовываем пользователя ||
// || Пример ответа: 
// {
//     "message": "Hello!!!"
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