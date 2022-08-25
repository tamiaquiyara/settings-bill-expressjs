let express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const SettingsBill = require('./settings-bill');
const moment = require("moment");

const app = express();
const settingsBill = SettingsBill();

app.engine('handlebars', exphbs.engine({
  defaultLayout: false,
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get("/", function(req, res){
  res.render("index", {
    settings: settingsBill.getSettings(),
    totals: settingsBill.totals(),
    colors: settingsBill.colors()
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
  const actions = settingsBill.actions()
    for(let action of actions){
      action.time = moment(new Date(action.timestamp)).fromNow()
    }
    res.render('actions', {actions});
});

app.get('/actions/:actionType', function(req, res){
  const actionType = req.params.type;
  const actions = settingsBill.actionsFor(actionType)
  for(let action of actions){
    action.time = moment(new Date(action.timestamp)).fromNow()
  }
  res.render('actions', {actions});
});


let PORT = process.env.PORT || 3011;

app.listen(PORT, function(){
  console.log('App starting on port',PORT );
});