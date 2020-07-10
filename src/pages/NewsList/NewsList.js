import React from "react";

import ArticleItem from "../../components/ArticleItem/ArticleItem";
import Loading from "../../components/Loader";

import { api } from "../../api";

import "./NewsList.css"


class NewsList extends React.PureComponent {

    state = {
        articles: null,
        loading: true
    };

    componentDidMount() {
        this.loadNews()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const pathname = this.props.location.pathname;
        const prevPathname = prevProps.location.pathname;

        if (pathname !== prevPathname) {
            this.setState({ loading: true }, this.loadNews)

        }
    }


    loadNews = () => {
        const pathname = this.props.location.pathname.split('/')[1];
        const searchValue = this.props.match.params.q;

        switch (pathname) {
            case 'lastnews':
                api.loadLatestNews()
                    .then(articles => this.setState({ articles, loading: false }));
                break;
            case 'search':
                api.searchNews(searchValue)
                    .then(articles => this.setState({ articles, loading: false }));
                break;
            default:
                api.loadSelectedSourceNews(pathname)
                    .then(articles => this.setState({ articles, loading: false }));
                break
        }
    };

    render() {

        const { header } = this.props;
        const { articles, loading } = this.state;

        if (loading) {
            return <Loading/>
        }

        return (
            <div className='news-list-container'>
                <h1 style={{ textAlign: 'center' }}>{header}</h1>
                {articles && articles.map((article, i) => <ArticleItem key={i} article={article}/>)}
            </div>
        )
    }
}

export default NewsList;