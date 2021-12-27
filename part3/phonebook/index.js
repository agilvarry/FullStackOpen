const express = require('express')
const app = express()
app.use(express.json())
const morgan = require('morgan')
app.use(morgan('tiny'));
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>');
});

app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people\b \n ${Date.now()}`);
});

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);

    const person = persons.find(person => person.id === id);
    if(person){
        response.json(person);
    }else{
        response.status(400).end();
    }  
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
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

      const names = persons.map(p=>p.name);
      const nums = persons.map(p=>p.number);
      if (names.includes(body.name) || nums.includes(body.number)){
        return response.status(400).json({ 
            error: 'duplicate data' 
          });
      }

      const person = {
          name: body.name,
          number: body.number,
          date: new Date(),
          id: generateId()
      }

    persons = persons.concat(person)
    response.json(person)
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});