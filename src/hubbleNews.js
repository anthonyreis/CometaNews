const axios = require('axios')

const url = 'https://hubblesite.org/api/v3/news'

const addInfo = async (original, moreInfo) => {
    return {
        title: original.title,
        url: original.url,
        abstract: moreInfo.abstract,
        thumbnail: moreInfo.thumbnail
    }
}

const getMoreInfo = async (news) => {
    var moreInfo = []
    for (const element of news ) {
        const urlAbstract = `https://hubblesite.org/api/v3/news_release/${element.id}`

        var ret = await axios.get(urlAbstract).then( (response) => {
            return {
                    abstract: response.data.abstract,
                    thumbnail: response.data.thumbnail
                }
        }).catch((error) => {
            return error
        })
        
        moreInfo.push(await addInfo(element, ret))
    }

    return moreInfo
}

const getHubbleNews = (callback) => {
    axios.get(url).then(async (response) => {
        const hubbleNews = response.data.map( (item) => {
            return {
                id: item.news_id,
                title: item.name,
                url: item.url
            }
        })

        const moreInfo = await getMoreInfo(hubbleNews)
        
        callback(undefined, moreInfo)
    }).catch(error => {
        callback(error, undefined)
    })
}

module.exports = getHubbleNews