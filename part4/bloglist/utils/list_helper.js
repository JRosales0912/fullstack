const lodash = require('lodash')
const dummy = (blogs) => {return 1}

const totalLikes = (blogList) => {
    let totalLikes = 0;
    blogList.forEach(element => {
        totalLikes = totalLikes + element.likes
    });
    return totalLikes
}

const favoriteBlog = (blogList) => {
    let blog = blogList[0];
    blogList.forEach(element => {
        if(blog.likes < element.likes){
            blog = element
        }
    });
    return {
        "title": blog.title,
        "author": blog.author,
        "likes": blog.likes
    }
}

const mostBlogs = (blogList) => {
  const authorNumberBlogs = lodash.countBy(blogList, 'author')
  let most = Math.max(...Object.values(authorNumberBlogs))
  const author = Object.keys(authorNumberBlogs).find((key) => authorNumberBlogs[key] === most)

  return {
    author: author,
    blogs: most,
  }
}

const mostLikes = (blogList) => {
    let grouped = Object.entries(lodash.groupBy(blogList,"author"))
    for (let index = 0; index < grouped.length; index++) {
        const element = grouped[index][1];
        grouped[index] = { author: grouped[index][0], likes: lodash.sumBy(element, function(o) { return o.likes; })};
    }
    const mostLikes = lodash.maxBy(grouped, function(o) {
        return o.likes;
      });
      
    return {
      author: mostLikes.author,
      likes: mostLikes.likes,
    }
}

module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes}