const BASE_URL = 'https://newsapi.org/v2/';
const key = process.env.REACT_APP_API;

class Api {

    fetchNews(parameter = '') {
        try {
            return fetch(`${BASE_URL}${parameter}&apiKey=${key}`)
                .then(res => res.json())
        } catch (e) {
            throw new Error(e)
        }
    }

    getSources() {
        return fetch(`${BASE_URL}/sources?apiKey=${key}`)
            .then(res => res.json())
            .then(data => data.sources.filter(item => {
                const sources = ["bbc-news", "cnn", "fox-news", "espn", "bloomberg"];
                return sources.includes(item.id);
            }).map(item => ({ id: item.id, name: item.name })))
    }

    loadLatestNews() {
        return this.fetchNews('top-headlines?category=general').then(data => data.articles)
    }

    loadSelectedSourceNews(sourceId) {
        return this.fetchNews(`top-headlines?sources=${sourceId}`).then(data => data.articles)
    }

    searchNews(value) {
        return this.fetchNews(`everything?q=${value}`).then(data => data.articles)
    }

}

const api = new Api();

export { api };