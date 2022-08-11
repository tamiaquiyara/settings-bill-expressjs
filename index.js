const exphbs  = require('express-handlebars');
let express = require('express');
const app = express();

// app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');

// app.use(express.static('public'));

app.get("/", function(req, res){
  res.send("Bill With Settings App");
});

app.post('/settings ', function(req, res){

});

app.post('/action ', function(req, res){

});

app.get('/actions ', function(req, res){

});

app.get('/actions/:type ', function(req, res){

});


let PORT = process.env.PORT || 3011;

app.listen(PORT, function(){
  console.log('App starting on port',PORT );
});