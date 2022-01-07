const blogsRouter = require("express").Router();
const Blog = require("../models/blog.js");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  console.log(request.body);
  const saved = await blog.save();

  response.json(saved);
});

blogsRouter.delete("/:id", async(request, response)=>{
  await Blog.findByIdAndRemove(request.params.id);

  response.status(204).end()
});

blogsRouter.put("/:id", async(request, response)=>{
  const req = request.body
  const newBlog ={
    likes : req.likes
  };

  const blog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {new:true})

  response.json(blog);
})
module.exports = blogsRouter;
