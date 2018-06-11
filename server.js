const express = require('express');
const ejs = require('ejs');
const fs = require('fs')

var app = express();

const port = process.env.PORT || 3000; 

app.set('view engine', 'ejs')


app.use((req,res,next) => {
	var now = new Date().toString();
	var log = `now ${now}: ${req.method} ${req.url}`
	console.log(log);
	fs.appendFile('server.log', log+ '\n', (err) => {
		if(err) {
			console.log('Unable to append to server log')
		}
	})
	next()
})



/*app.use((req,res,next) => {
	res.render('maintainence.ejs')
})*/

app.use(express.static(__dirname + '/public'))

app.get('/',(req,res) => {
	//res.send('<h1>Hello Good Morning!!!!</h1>')
	res.render('home.ejs',{
		home:'Welcome to Home page'
	})
});

app.get('/about',(req,res) => {
	res.render('about.ejs',{
		user:'Hello user',
		year:new Date().getFullYear()
	})
})


app.listen(port, () => {
	console.log('server is up on port 3000')
});