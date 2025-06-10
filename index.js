// _____________________ ИМПОРТ БИБЛИОТЕК ______________________________________
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

// _____________________ ИМПОРТ ПУТЕЙ _________________________________________
const authRouter = require("./routes/authRouter");

// ______________ НАСТРОЙКА ПАРАМЕТРОВ ПРИЛОЖЕНИЯ ______________________________
const port = 4000;
const corsOptions ={
    origin: '*', 
    credentials: true,
    optionSuccessStatus: 200,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
require('dotenv').config();

// ________________________ МЕТОДЫ ____________________________________________
app.use("/api/auth", authRouter);

// _____________________ ЗАПУСК ПРИЛОЖЕНИЯ _____________________________________
async function start() {
    try {
        await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin&directConnection=true`);
        app.listen(port, () => {
            console.log(`App started on port ${port}`);
        });
    } catch(error) {
        console.error(error);
    };
};

start();
