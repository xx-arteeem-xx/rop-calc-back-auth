const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Role = require("../models/Role");
const logger = require("../logger/logger.js");

function generateAccessToken(id, roles){
    const payload = {
        id,
        roles
    };
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "24h"});
};

class AuthController {
    async reg(req, res) {
        try {
            // ________________ ПРОВЕРЯЕМ НА ОШИБКИ ВАЛИДАЦИИ ___________________________
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                throw new Error("Validation error!");
            };

            // ________________ ПРОВЕРЯЕМ НА СУЩЕСТВОВАНИЕ ПОЛЬЗОВАТЕЛЯ ___________________________
            const {username, password} = req.body;
            const candidate = await User.findOne({username});
            if (candidate) {
                throw new Error("User already exists!");
            };

            // ________________ ПОДГОТАВЛИВАЕМ ДАННЫЕ ДЛЯ СОХРАНЕНИЯ В БД ___________________________
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"});

            // ________________ СОХРАНЯЕМ ДАННЫЕ В БД ___________________________
            const user = new User({username, password: hashPassword, roles: [userRole.value]});
            await user.save();

            // ________________ ИНФОРМИРУЕМ ПОЛЬЗОВАТЕЛЯ О СОХРАНЕНИИ ДАННЫХ __________________________
            res.status(200).json({
                "message": `User ${username} with role ${userRole.value} was saved successfully!`
            })
            logger.info({
                "path": req.path,
                "ip": req.ip
            })
        } catch (error) {
            // ________________ ЕСЛИ НАШЛИ ОШИБКУ __________________________
            res.status(400).json({
                "error": error.message
            });
            logger.error({
                "error": error.message,
                "path": req.path,
                "ip": req.ip
            })            
        }
    }

    async login(req, res){
        try {
            // ________________ ПРОВЕРЯЕМ НА СУЩЕСТВОВАНИЕ ПОЛЬЗОВАТЕЛЯ ___________________________
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if (!user) {
                throw new Error("Username or password incorrect!");
            };

            // ________________ ПРОВЕРЯЕМ ПРАВИЛЬНОСТЬ ВВЕДЕННОГО ПАРОЛЯ ___________________________
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                throw new Error("Username or password incorrect!");
            };

            // ________________ ГЕНЕРИРУЕМ ТОКЕН ___________________________ 
            const token = generateAccessToken(user._id, user.roles);

            // ________________ ОТДАЕМ ПОЛЬЗОВАТЕЛЮ ТОКЕН __________________________
            res.status(200).json({
                token
            })
            logger.info({
                "path": req.path,
                "ip": req.ip
            })
        } catch (error) {
            // ________________ ЕСЛИ НАШЛИ ОШИБКУ __________________________
            res.status(400).json({
                "error": error.message
            });
            logger.error({
                "error": error.message,
                "path": req.path,
                "ip": req.ip
            })            
        }
    }

    async authCheck(req, res){
        try {
            res.status(200).json({
                "message": "auth"
            });
            logger.info({
                "path": req.path,
                "ip": req.ip
            })
        } catch (error) {
            res.status(400).json({
                "error": error.message
            });
            logger.error({
                "error": error.message,
                "path": req.path,
                "ip": req.ip
            })            
        }
    }
}

module.exports = new AuthController();