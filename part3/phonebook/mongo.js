const mongoose = require('mongoose')
console.log(process.argv.length)
if (process.argv.length !== 3 && process.argv.length !== 5) {
    console.log('Please provide correct arguments')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.kpnti.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.connect(url)
const numberSchema = new mongoose.Schema({
    name: String,
    number: String,
    date: Date
})
const Number = mongoose.model('Number', numberSchema)

if (process.argv.length === 5) {
    const name = process.argv[3]
    const num = process.argv[4]

    const number = new Number({
        name: name,
        number: num,
        date: new Date(),
    })

    number.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    });
}else if (process.argv.length === 3){
    console.log('phonebook:')
    Number.find({}).then(result => {
        result.forEach(num => {
          console.log(`${num.name} ${num.number}`)
        })
        mongoose.connection.close()
      })
}