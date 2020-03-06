var express = require('express');
let database = require('./database');
let ItemModel = require('./schema/item.js')
const app = express()
const port = 3000

app.get('/', function(req, res, next) 
{
	console.log("doing a get")
	ItemModel
		.find({

		})
		.then(doc => 
		{
			res.send(doc)
			console.log(doc);
		})
		.catch(err => {
			console.error(err)
		})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

let item = new ItemModel({
	task: 'say bye'
})

item.save()
	.then(doc => 
	{
		console.log(doc)
	})
	.catch(err => {
		console.error(err)
	})