const totalLikes = (blogs) => {
  let total = 0;
  for(i in blogs){
    total += blogs[i].likes;
  }
  return total;
}

module.exports = {
  totalLikes
}