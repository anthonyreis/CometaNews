const axios = require('axios')

const url1 = 'https://spaceflightnewsapi.net/api/v2/articles'
const url2 = 'https://spaceflightnewsapi.net/api/v2/blogs'

const getNews = (callback) => {
    axios.all([
        axios.get(url1), 
        axios.get(url2)
        ])
        .then(axios.spread((responseNews, responseBlog) => {
        
        resultNews = responseNews.data.map((item) => {
            return {
                     title: item.title,
                     image: item.imageUrl,
                     resumo: item.summary,
                     completeNews: item.url
                 }
         })

         resultBlog = responseBlog.data.map((item) => {
            return {
                     title: item.title,
                     image: item.imageUrl,
                     resumo: item.summary,
                     completeNews: item.url
                 }
         })

        callback(undefined, resultNews.concat(resultBlog))
    })).catch(error => {
        callback(error, undefined)
    })
}

module.exports = getNews