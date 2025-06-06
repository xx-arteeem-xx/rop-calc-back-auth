![Express Logo](https://st.timeweb.com/cloud-static/apps-logo/express.svg)

# Express

## Локальный запуск проекта

```bash
# установка зависимостей
npm install

# запуск приложения
nodemon index
```

## Методы

#### МЕТОД 0. При переходе на страницу "/api/" Выдаем приветственное сообщение 

#### Пример ответа: 
```json
{
    "message": "Hello!!!"
}
```

#### МЕТОД 1. При переходе на страницу "/api/auth" авторизовываем пользователя 
#### Пример запроса: 
```json
{
    "username": "artemka",
    "password": "1234"
}
```
#### Пример ответа: 
```json
{
    "message": "Successfully logged in!",
    "secretKey": "ndI0_[!g@!ALTaW1M=Tv=5Wa=#dIIn}0"
}
```