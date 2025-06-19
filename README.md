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
#### МЕТОД 1. При переходе на страницу "/api/auth/reg/" Регистрируем пользователя ||

#### Пример запроса: 
```json
{
    "username": "test1",
    "password": "12345678"
}
```

#### Пример ответа: 
```json
{
    "message": "User test1 with role USER was saved successfully!"
}
```

#### МЕТОД 2. При переходе на страницу "/api/auth/login/" выдаем пользователю токен ||

#### Пример запроса: 
```json
{
    "username": "test1",
    "password": "12345678"
}
```

#### Пример ответа: 
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6I...E1NjB9.9O8lQYHbK_wAchtnfFtSoNhrVAzcZ8Km7TpEeOlHYYQ"
}
```

#### МЕТОД 3. При переходе на страницу "/api/auth/" проверяем аутентификацию от пользователя ||

#### Пример ответа: 
```json
{
    "message": "auth"
}
```