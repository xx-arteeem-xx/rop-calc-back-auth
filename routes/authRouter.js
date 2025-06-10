// _____________________ ИМПОРТ БИБЛИОТЕК ______________________________________
const express = require('express');
const {check} = require("express-validator")
const router = express.Router();
const controller = require("../controllers/authController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
const roleMiddleware = require("../middlewares/roleMiddleware.js");

router.post('/reg', [
    check("username", "Username must be between 4 and 32 characters long!").isLength({min: 4, max: 32}),
    check("password", "Password must be between 8 and 16 characters long!").isLength({min: 8, max: 16})
], controller.reg);
router.post('/login', controller.login);
router.get('/', roleMiddleware(["ADMIN"]), controller.getUsers);

module.exports = router;