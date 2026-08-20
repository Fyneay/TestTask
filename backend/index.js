const express = require('express');
const app = express();
const cors =  require('cors');

app.use(cors({
    origin: `http://${process.env.APP_HOST}:${ process.env.APP_FRONT_PORT}`,
    methods: 'GET,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Accept'],
    credentials: true,
    optionSuccessStatus:200,
}));

app.use(express.json());

//Для application/x-www-form-urlencoded (postman)
app.use(express.urlencoded({ extended: true }));

const mainRouter = require('./routes/index');

app.use('/api', mainRouter);

app.listen(process.env.APP_BACKEND_PORT ?? 3000, () => {
    console.log('Запуск сервера');
})