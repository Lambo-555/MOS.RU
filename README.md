## Команда хакатона - CENSORED

**Состав:**
* Кулин Никита
* Евгений Козлов
* Колокольцев Алексей
* Малышев Станислав
* Янкин Александр

## Задача от Департамента культуры города Москвы

Разработка рекомендательного сервиса по контенту и активностям учреждений культуры  

## Наше решение:

* **Рекомендательный сервис:** Для демонстрации работы сервиса мы создали оболочку в виде SPA, которая наглядно демонстрирует работу сервиса подбора рекомендаций на основании множества данных.
* **Обратная связь:** Пользователь может многое рассказать о себе, и мы в этом ему активно помогаем за счет влкюченных в интерфейс форм обратной связи, таких как кнопки "нравится", "не нравится", "подписаться". В сервис встроены функции оценки действий пользователя, такие как определение % дочитывания, отсечка времени, потраченного на отдельные посты в ленте, на чтение поста/страницы. Алгоритмы собирают информацию и до-обучают ML модели, создают все более качественные ленты рекомендаций на ходу
* **Машинное обучение:** Наши алгоритмы автоматически анализируют огромные объемы данных в фоновом режиме, обучают персонализированные модели, позволяя пользователям получать релевантные интересные новости.
* **API:** Вы можете получать рекомендации не только через SPA. Наше решение дает возможности пользоваться всеми вышеописанными функциями на ресурсах, в которых доступна авторизация пользователей.

```jsx
Сервис выполняет свою основные функции моментально. До-обучение моделей ML происходит параллельно.
Пользователь получит рекомендации вовремя, и как только модели обновятся новые релевантные книги попадут к нему в ленту
```

##### Афиша
![](https://github.com/Censored-Data/MOS.RU/blob/main/Gallery/Afisha.gif?raw=true)

#### Rate Limiting

```js
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));
```

#### 

## :rocket: Getting Started

### Installation
Frontend: (Port 3001)
```sh
cd client
npm install
npm run dev
```

Backend Node.js: (Port 3002)
```sh
cd node
npm install
npm run dev
```

Backend Python: (Port 3003)
```sh
cd server
python3 webserver.py
```


## Требования
* Node.js 12.18.4 https://nodejs.org/en/download/
* Python 3.x https://www.python.org/downloads/
