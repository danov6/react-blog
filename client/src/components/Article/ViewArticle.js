import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import IconButton from '@material-ui/core/IconButton';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';

import LoadingSpinner from './../LoadingSpinner';
import CommentSection from './CommentSection';

class ViewArticle extends React.Component {

    state = {
        article: {},
        isAuthor: false,
        isLoading: true,
        articleLiked: false,
    };

    componentDidMount(){
        const articleId = this.props.match.params.articleId;
        axios(`http://localhost:8000/articles/${articleId}`)
        .then(res => {
            let data = res.data;
            this.setState({
                article: data.article,
                isLoading: false
            });
        });
    }

    handleLike = () => {
        this.setState(prevState => ({
            articleLiked: !prevState.articleLiked
        }));
    }

    render() {
        const { article, isLoading, articleLiked } = this.state;
        return (
            <div>
                <div className="app_container jumbotron">
                    {isLoading ? 
                    <LoadingSpinner /> :
                    <div>
                        <h1 className="display-4">{article.title}</h1>
                        <p className="lead">By {article.author_name}</p>
                        <p className="lead">
                            <Link to={`/article/edit/${article._id}`}>Edit</Link>
                        </p>
                        <hr className="my-4" />
                        <p>{article.body}</p>
                        <div><span className="badge badge-pill badge-primary">{article.keyword}</span></div>
                        <br />
                        <div>
                            <IconButton aria-label="delete" className="thumbs_up" onClick={this.handleLike}>
                                {articleLiked ? <ThumbUpAltIcon style={{cursor: 'pointer'}} color="primary" fontSize="large"/> :
                                <ThumbUpAltOutlinedIcon style={{cursor: 'pointer'}} color="primary" fontSize="large"/>
                                }
                            </IconButton>
                            <span style={{color: '#3f50b5', fontSize: 25, verticalAlign: 'middle','marginLeft': 10}}>{article.upvotes}</span>
                        </div>
                        <br />
                        <hr />
                        <CommentSection comments={article.comments} />   
                    </div>    
                    }
                </div>
            </div>
        );
    }
}

export default ViewArticle;