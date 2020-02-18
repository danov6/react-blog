import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import LoadingSpinner from './../LoadingSpinner';

class ViewArticle extends React.Component {

    state = {
        article: {},
        isAuthor: false,
        isLoading: true,
        articleLiked: false,
        commentValue: ''
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

    handleCommentText = (key, event) => {
        this.setState({
          [key]: event.target.value,
        });
    }

    render() {
        const { article, isLoading } = this.state;
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
                            <IconButton aria-label="delete" className="thumbs_up">
                                <ThumbUpAltIcon style={{cursor: 'pointer'}} color="primary" fontSize="large"/>
                            </IconButton>
                            <span style={{color: '#3f50b5', fontSize: 25, verticalAlign: 'middle','marginLeft': 10}}>{article.upvotes}</span>
                        </div>
                        <br />
                        <hr />
                        <i>Comments ({article.comments.length})</i>
                        <br />
                        <TextField
                        id="outlined-multiline-static"
                        label="Write a response"
                        multiline
                        rows="3"
                        // placeholder="Write a response.."
                        variant="outlined"
                        name="name"
                        style={{width: '100%', margin: '15px 0px'}}
                        onChange={(ev) => this.handleCommentText('comment', ev)}
                        />
                        <Button variant="contained" color="primary">
                        Submit
                        </Button>
                    </div>    
                    }
                </div>
            </div>
        );
    }
}

export default ViewArticle;