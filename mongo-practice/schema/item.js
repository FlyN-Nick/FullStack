let mongoose =require('mongoose')
let validator = require('validator')

let itemSchema = new mongoose.Schema ({
	task: String
})

module.exports = mongoose.model('Item', itemSchema)
    