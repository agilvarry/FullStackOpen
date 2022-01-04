const app = require('./app')
const http = require('http')
require('dotenv').config();



const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})