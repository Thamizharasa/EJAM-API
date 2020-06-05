var express = require('express'),
	bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    middleware = require('./Middleware');
    cors = require('cors');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

var mongoUri = 'mongodb+srv://thamizh:thamizh_5051@cluster0-jmh67.mongodb.net/EJAM?retryWrites=true&w=majority';

mongoose.connect(mongoUri, {
	useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function(err, res) {

	if (err) {
		return console.error('Error connecting to "%s":', mongoUri, err);
    }
  	console.log('Connected successfully to "%s"', mongoUri);
});

app.all('/', function (req, res,next) {
    
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.get('/getdeployments',async(req,res)=>
{
    
 
	res.status(200);
	res.send(JSON.stringify({Data:await middleware.GetDeployments()}));
	res.end();

})  

app.get('/gettemplates',async(req,res)=>
{
   
	res.status(200);
	res.send(JSON.stringify(await middleware.GetTemplateName()));
	res.end();

})


app.post('/adddeployment',async(req,res)=>
{
  let {id} = await middleware.AddDeployments(req);
  res.status(200);
  res.send({Data:await middleware.GetDeployments()})
	//res.send(JSON.stringify({Data:id!=undefined ? await middleware.GetDeployments():" Something Went Wrong please try again"}));
	res.end();
})       

app.post("/deletedeployment",async(req,res)=>
{
   let {deletedCount} = await middleware.deleteDeployments(req);
   res.status(200);
  // res.send(JSON.stringify({Data:deletedCount >= 1 ? await middleware.GetDeployments() : " Something Went Wrong please try again"}));
  res.send({Data:await middleware.GetDeployments()})
   res.end();

})
app.listen(8000);

