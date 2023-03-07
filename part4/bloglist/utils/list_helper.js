const dummy = (blogs) => {return 1}

const totalLikes = (blogList) => {
    let totalLikes = 0;
    blogList.forEach(element => {
        totalLikes = totalLikes + element.likes
    });
    return totalLikes
}

module.exports = {dummy, totalLikes}