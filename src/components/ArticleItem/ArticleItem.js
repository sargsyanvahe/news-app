import React from "react";

import Article from "../Article/Article";
import ModalContainer from "../ModalContainer";

import './ArticleItem.css'

class ArticleItem extends React.PureComponent {

    state = {
        openedDetailedModal: false
    };

    handleCloseModal = () => {
        this.setState({ openedDetailedModal: false })
    };

    render() {

        const { article } = this.props;
        const { openedDetailedModal } = this.state;

        return (
            <>
                <div className='article-item-container'>
                    <div className='article-item-image-container'>
                        <img
                            src={article.urlToImage}
                            alt=""/>
                    </div>
                    <div className='article-item-texts-container'>
                        <h2>{article.title}</h2>
                        <h3><i>by</i> {article.author}</h3>
                        <p>{article.description}</p>
                        <span onClick={() => this.setState({ openedDetailedModal: true })}>Read more</span>
                    </div>
                </div>
                {openedDetailedModal &&
                <ModalContainer><Article handleCloseModal={this.handleCloseModal} article={article}/></ModalContainer>}
            </>
        )
    }
}

export default ArticleItem