require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Number = require('./models/number')


const app = express()
app.use(express.json())
app.use(morgan('tiny'));
app.use(express.static('build'))
app.use(cors());


// app.get('/', (request, response) => {
//     response.send('<h1>Hello World!</h1>');
// });

app.get('/info', (request, response) => {
  response.send(`Phonebook has info for ${persons.length} people\b \n ${Date.now()}`);
});

app.get('/api/persons', (request, response) => {
  Number.find({}).then(persons => {
    response.json(persons);
    // mongoose.connection.close()
  })

});

app.get('/api/persons/:id', (request, response, next) => {  
  Number.findById(request.params.id)
  .then(note => {
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))})

app.delete('/api/persons/:id', (request, response) => {
  Number.findByIdAndRemove(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
});

const generateId = () => {
  return Math.floor(Math.random() * 10000000)
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing'
    });
  }

  const number = new Number({
    name: body.name,
    number: body.number,
    date: new Date(),
  })

  number.save().then(savedNum => {
    response.json(savedNum)
  });
})
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});