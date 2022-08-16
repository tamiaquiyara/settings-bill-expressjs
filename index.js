let express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const SettingsBill = require('./settings-bill');

const app = express();
const settingsBill = SettingsBill();

app.engine('handlebars', exphbs.engine({defaultLayout: false}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get("/", function(req, res){
  res.render("index", {
    settings: settingsBill.getSettings(),
    totals: settingsBill.totals()
  });
});

app.post('/settings', function(req, res){
    

    settingsBill.setSettings({
      callCost: req.body.callCost,
      smsCost: req.body.smsCost,
      warningLevel: req.body.warningLevel,
      criticalLevel: req.body.criticalLevel
    });
    
    console.log(settingsBill.getSettings());
  
   res.redirect('/');
});

app.post('/action', function(req, res){

    //capture the call type to add
    // console.log(req.body.actionType);

    settingsBill.recordAction(req.body.actionType);

   res.redirect('/');
});

app.get('/actions', function(req, res){

});

app.get('/actions/:type', function(req, res){

});


let PORT = process.env.PORT || 3011;

app.listen(PORT, function(){
  console.log('App starting on port',PORT );
});