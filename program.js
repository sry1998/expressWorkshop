const express = require('express');
const bodyparser = require('body-parser');
const fs = require('fs');
const app = express();

app.get('/home', function(req,res) {
  res.end('Hello World!');
})

app.set('view engine', 'pug');
app.set('views', process.argv[3]);
app.get('/home', function(req,res) {
  res.render('index', {date: new Date().toDateString()});
})

app.use(express.static(process.argv[3]))

app.use(bodyparser.urlencoded({extended: false}));
app.post('/form', function(req,res) {
  res.send(req.body.str.split('').reverse().join(''));
})

app.use(require('stylus').middleware(process.argv[3]))
app.use(express.static(process.argv[3]))

app.put('/message/:id', function(req, res){
  const id = req.params.id
  const msg = require('crypto')
    .createHash('sha1')
    .update(new Date().toDateString() + id)
    .digest('hex')
  res.send(msg)
})

app.get('/search', function (req,res) {
  const obj = req.query;
  res.send(obj);
})

app.get('/books', function(req, res){
  const book = process.argv[3];
  fs.readFile(book, function(err, data) {
    if (err) throw err;
    const booksObj = JSON.parse(data);
    res.json(booksObj);
  })
})
app.listen(+process.argv[2]);