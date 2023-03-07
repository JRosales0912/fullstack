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

module.exports = {dummy, totalLikes, favoriteBlog,}