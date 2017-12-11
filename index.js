var express = require('express');
var document = require('document');
var request = require('request');
var ejs = require('ejs');
var path = require('path');
var bodyparser = require('body-parser');

var app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//(1)
app.get('/', function (req, res) {
  res.send('Hello world! Ravi Kant');
console.log('server is on http://127.0.0.1:8000/')
});

//(2)
app.get('/author', function (req, res) {

     var authors=[];
     var posts=[];
     var details=[];
 request('https://jsonplaceholder.typicode.com/users', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      authors=JSON.parse(body);  
    }
request('https://jsonplaceholder.typicode.com/posts', function (error, response, body) {
    if (!error && response.statusCode == 200) {
       posts=JSON.parse(body);
    }
 
         var la=authors.length;
         var lp=posts.length;
        for( var i = 0; i < la; i++ ) {
            var name = authors[i].username;
            var id = authors[i].id;
            var c=0;
            // here we can use a seprate array to store authors name
            for( var j = 0; j < lp; j++ ){
               if(id==posts[j].userId)
              c= c+1;
             // here we can use a seprate array to store posts
             }
            var detail={username: name,
                        postscount: c  };
            details.push(detail);
           }

res.render('author',{users:details});
  });
 });
  
});

//(3)
app.get('/setcookie', function (req, res) {
  var cookie = document.cookie;
  if (cookie === undefined)
  {  
     var name = 'Ravi Kant';
     var value = '24';
    var expires = "";
        var date = new Date();
        date.setTime(date.getTime() + (24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
       document.cookie = name + "=" + value + expires;
    res.send('cookie created successfully');
  } 
  else
  {
    res.send('cookie exist '+cookie);
  }
});

//(4)
app.get('/getcookie', function (req, res) {
  var cookie = document.cookie;
  if (cookie === undefined)
  {  
    res.send('cookie does not exist');
  } 
  else
  { 
    var s = cookie.split(';')[0];
    var name = s.split('=')[0];
    var value = s.split('=')[1]; 
    res.send('name = '+name+', value = '+value);
  }
});

//(5)
app.get('/html', function (req, res) {
res.render('index');
});

//(6)
app.get('/robots.txt', function (req, res) {
res.redirect('http://httpbin.org/deny​​');// can use any unreachable link
});

//(7)
app.get('/input', function (req, res) {
res.render('textbox');
});

app.post('/data', function(req, res){
    
    var text = req.body.input;
    console.log(text);
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000');
})
