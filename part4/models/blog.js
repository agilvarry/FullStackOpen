const mongoose = require('mongoose')
const mongoUrl = 'mongodb+srv://fullstack:fullstack@cluster0.kpnti.mongodb.net/blog?retryWrites=true&w=majority'
mongoose.connect(mongoUrl)

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
  
module.exports = mongoose.model('Blog', blogSchema)
  
 