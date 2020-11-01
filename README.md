# MOS.RU
#### Censored hackathon team

##### Афиша
![](https://github.com/Peace-Data/Peace-Data/blob/main/MVP/Demonstration/services.png?raw=true)
##### Navigation
![](https://github.com/Peace-Data/Peace-Data/blob/main/MVP/Demonstration/navigation.png?raw=true)

```

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
