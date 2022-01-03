const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')



const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    }).catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

mongoose.connect(url)
const numberSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    number: {type: String, required: true, unique: true},
    date: {type: Date, required: true},
  });

numberSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
numberSchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('Number', numberSchema)