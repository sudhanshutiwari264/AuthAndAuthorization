const express = require('express');
const app = express();
const path = require('path')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt');
const { hash } = require('crypto');
const jwt = require('jsonwebtoken');

app.set('view engine','ejs')

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,`public`)));

app.get('/',(req, res)=>{
  let token = jwt.sign({email:`personal@gmail.com`}, "secret");
  res.cookie('token',token);
  res.send("done");
});

app.get('/read',(req, res)=>{
  let data = jwt.verify(req.cookies.token,"secret");
  console.log(data);
});

app.listen(3000,(err)=>{
  if(err) console.log(err);
  else console.log("Server is running ")
});
/*

let generated_hash;

app.get('/read',(req, res)=>{
  bcrypt.hash('1234', 10, function(err, hash) {
    generated_hash = hash;
    res.send(`password: ${generated_hash}`);
  });
});


app.get('/pass',(req,res)=>{
  bcrypt.compare('1234', '$2b$10$jyGmi9EHL0RJAQKFcOP0YuzS2OEP9zmagvDeI32q5FEsiiMZqOZEO', function(err, result) {
    if(result) res.send("logged in");
    else res.send("Wrong");
  });
});
*/