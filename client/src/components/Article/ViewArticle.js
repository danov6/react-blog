import React from 'react';
import axios from 'axios';
import {
  Link
} from "react-router-dom";


class ViewArticle extends React.Component {

    state = {
        article: {}
    };

    componentDidMount(){
        const articleId = this.props.match.params.articleId;
        axios(`http://localhost:8000/articles/${articleId}`)
        .then(res => {
            let data = res.data;
            this.setState({
                article: data.article,
            });
        });
    }

    render() {
        const { article } = this.state;
        return (
            <div className="app_container jumbotron">
                <h1 className="display-4">{article.title}</h1>
                <p className="lead">By {article.author}</p>
                <hr className="my-4" />
                <p>{article.body}</p>
                <p className="lead">
                    <Link to={`/article/edit/${article._id}`}>Edit</Link>
                </p>
            </div>
        );
    }
}

export default ViewArticle;