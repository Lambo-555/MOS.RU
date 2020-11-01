const express     =  require('express')
const rateLimit   =  require("express-rate-limit");
const userAgents  =  require('random-useragent');
var bodyParser    =  require('body-parser');
var md5           =  require('md5');
var useragent     =  require('express-useragent');
var urlencode     =  require('urlencode');
var request       =  require('request');
const mysql       =  require('mysql2');
const app         =  express()
const port        =  3002

const limiter = rateLimit({
  windowMs: 1000,
  max: 100,
  message: JSON.stringify({"Error": "Вы слишком часто пользуйтесь нашими услугами"})
});

app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(useragent.express());

app.use(function(req, res, next){
   var data = "";
   req.on('data', function(chunk){ data += chunk})
   req.on('end', function(){
      req.rawBody = data;
      next();
   })
})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


const connection = mysql.createConnection({
    host             :  "host",
    user             :  "username",
    password         :  "password",
    database         :  "db_name"
});


const statusCode = {
    "success"        :  200,
    "flud"           :  429,
    "bad_request"    :  400,
    "unauthorized"   :  401,
    "payment"        :  402,
    "forbidden"      :  403
}


// +-----------------------------------------------------------------+
// | Проверка сессии пользователя для осуществления подписи запросов |
// +-----------------------------------------------------------------+


async function checkUserToken(token) {
	return new Promise(function(resolve) {
    connection.query('SELECT * FROM users WHERE MD5(CONCAT(users.u_email, users.u_password)) = "' + token + '"', async function(err, results, fields) {
        if (err) throw err;
        if (typeof results !== 'undefined' && results.length > 0) {
        	return resolve([true, results[0]['u_id']]);
        } else {
        	return resolve([false, null]);
        } }
    );
});
}

// +--------------------------------------------------------------------------------+
// | Получение дополнительной информации о книгах и журналах через Google Books API |
// +--------------------------------------------------------------------------------+


async function getBookInfo(title, author) {
    var authorPreset = '';
    if (author !== 'undefined' && author !== null) {
      authorPreset = '+inauthor:' + author;
    }
    var options = {
        'method' : 'GET',
        'url'    : 'https://www.googleapis.com/books/v1/volumes?q=' + title + authorPreset,
        'headers': {
            'user-agent': userAgents.getRandom()['userAgent']
        }
    }
    request(options, async function(error, response) {
        if (!error) {
          res.send(response.body); 
        } else {
            if (error['code'] == 'ECONNRESET') {
                return { "statusCode": statusCode['bad_request'], "Error": "Error when using proxy, possibly incorrect proxy format" }, statusCode['unauthorized'];
            } else { console.log(error); }
        }
    });
}



// +----------------------------------------------------------------+
// | Осуществление пользователем подписку на определенную категорию |
// +----------------------------------------------------------------+


app.get('/followCategory', async (req, res) => {

	res.type('json');

	var License    = await checkUserToken(req.headers['accesstoken']);
  var categoryID = Buffer.from(req.headers['categoryhash'], 'base64').toString();

	if (License[0] == true) {
    
  connection.query('SELECT * FROM categories, categories_connect WHERE categories.c_id = categories_connect.cc_cat_id AND categories_connect.cc_cat_id = ' + categoryID + ' AND categories_connect.cc_u_id = ' + License[1],
  async function(err, results, fields) {
  if (err) throw err;
  if (typeof results !== 'undefined' && results.length > 0) {
    connection.query("DELETE FROM categories_connect WHERE categories_connect.cc_cat_id = " + parseInt(categoryID) + " AND categories_connect.cc_u_id = " + parseInt(License[1]),
    async function(err, results) {
     if (err) throw err;
      var Response = {
        'status'      : 'success',
        'is_followed' : false,
        'category_id' : categoryID,
        'message'     : 'Вы успешно отписались от категории',
      }

      res.send(Response);

    }); } else {

    connection.query("INSERT INTO `categories_connect` (`cc_id`, `cc_u_id`, `cc_cat_id`) VALUES (NULL, '" + License[1] + "', '" + categoryID + "')",
    async function(err, results, fields) {
    if (err) throw err;

      var Response = {
        'status'      : 'success',
        'is_followed' : true,
        'category_id' : categoryID,
        'message'     : 'Вы успешно подписались на выбранную категорию'
      }
      
      res.send(Response);

    }); } }); } else {

		  var Response = {
        'status'      : 'error',
        'message'     : 'Произошла ошибка. Повторите попытку позже'
      }
      
      res.send(Response);

} });


// +--------------------------+
// | Авторизация пользователя |
// +--------------------------+


app.post('/login', async (req, res) => {

    res.type('json');

    let email       =  Buffer.from(req.headers['login'], 'base64').toString();
    let password    =  md5(Buffer.from(req.headers['password'], 'base64').toString());
    let useragent   =  req.headers['user-agent'];

    let sessionKey  =  md5(email + password);

    connection.query("SELECT * FROM users WHERE users.u_email = '" + email + "' AND users.u_password = '" + password + "'", function(err, results, fields) {
    
    if (err) throw err;

    if (typeof results !== 'undefined' && results.length > 0) {
      var userData = {
        'status'      : 'success',
        'name'        : results[0]['u_name'],
        'middlename'  : results[0]['u_middle_name'],
        'surname'     : results[0]['u_surname'],
        'avatar'      : results[0]['u_avatar'],
        'session_key' : sessionKey
      }
      res.send(userData);
    } else {
      var Response = {
        'status'  : 'error',
        'Message' : 'Неверное имя пользователя или пароль' 
      }
      res.send(Response);
    }});
});



// +------------------------------+
// | Вывод категорий пользователя |
// +------------------------------+


app.get('/categories', async (req, res) => {

  res.type('json');

	var License = await checkUserToken(req.headers['accesstoken']);

	if (License[0] == false) {
    var userCategories = [];
    connection.query('SELECT * FROM categories ORDER BY RAND()', async function(err, results, fields) {
    if (err) throw err;
    results.forEach((results, index, self) => {
    var categoriesArray = {
      'id'          : results['c_id'],
      'title'       : results['c_title'],
      'preview'     : results['c_image'],
      'font_color'  : results['c_text_color'],
      'is_followed' : false
    }
    userCategories.push(categoriesArray);
    });
    res.send({'categories' : userCategories});

    })} else {

    var userCategories = [];
    var followedCategories = [];

    connection.query('SELECT * FROM categories ORDER BY RAND()', function(err, results, fields) {
    if (err) throw err;
    results.forEach((results, index, self) => {
    var categoriesArray = {
      'id'          : results['c_id'],
      'title'       : results['c_title'],
      'preview'     : results['c_image'],
      'font_color'  : results['c_text_color'],
      'is_followed' : false
    }
    userCategories.push(categoriesArray);
    });

    connection.query('SELECT * FROM categories, categories_connect WHERE categories.c_id = categories_connect.cc_cat_id AND categories_connect.cc_u_id = ' + License[1], async function(err, results, fields) {
    results.forEach((results, index, self) => {

    userCategories.forEach((categories, index, self) => {
      if (categories['id'] == results['c_id']) {
        userCategories[index]['is_followed'] = true;
      }
    });

    followedCategories.push(results['c_id']);

    });

    res.send({'categories' : userCategories});

    }); }); } });


app.get('/news/:id', async (req, res) => {
  res.send('id: ' + req.params.id);
});

// +-----------------------------------+
// | Поиск в режиме реального времени  |
// +-----------------------------------+

app.post('/search', async (req, res) => {

  var searchArray = [];

  connection.query("SELECT * FROM categories WHERE categories.c_title LIKE '%" + req.query['question'] + "%' ORDER BY categories.c_title LIMIT 6", function(err, results, fields) {
  
  if (err) throw err;
  
  if (typeof results !== 'undefined' && results.length > 0) {

    res.type('json');
            
            results.forEach((results, index, self) => {
            var searchItem = {
              'id'    : results['c_id'],
              'title' : results['c_title'],
              'image' : results['c_image']
            }
            searchArray.push(searchItem);
          });
            console.log(results);
            res.send(searchArray);
          } else {
            res.send('');
          }
        }
    );
});

// +---------------------------------+
// | Вывод новостей через API MOS.RU |
// +---------------------------------+

app.get('/news', async (req, res) => {

    res.type('json');

    var page   =  req.headers['page'];
    var count  =  req.headers['count'];

    var options = {
        'method'  : 'GET',
        'url'     : 'https://www.mos.ru/api/newsfeed/v4/frontend/json/ru/articles?expand=spheres&fields=id,title,image,published_at_timestamp,published_at&page=' + page + '&per-page=' + count,
        'headers' : {
            'user-agent' : userAgents.getRandom()['userAgent']
        }
    }

    request(options, async function(error, response) {
    if (!error) { console.log(response.body); res.send(response.body); } else {
    if (error['code'] == 'ECONNRESET') { return { "statusCode": statusCode['bad_request'], "Error": "Error when using proxy, possibly incorrect proxy format" }, statusCode['unauthorized'];
    } else { console.log(error); } }
    
    }); });


var server = app.listen(port, () => {
  console.log(`MOS.RU API started at port: ${port}`)
});

server.setTimeout(30000);