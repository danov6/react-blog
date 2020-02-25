import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Chip from '@material-ui/core/Chip';

import LoadingSpinner from './../LoadingSpinner';
import CommentSection from './CommentSection';

class ViewArticle extends React.Component {

    state = {
        article: {},
        isAuthor: false,
        isLoading: true,
        articleLiked: false,
        isPopupOpen: false
    };

    componentDidMount(){
        const articleId = this.props.match.params.articleId;
        axios(`http://localhost:8000/articles/${articleId}`)
        .then(res => {
            let data = res.data;
            const { user } = this.props;

            console.log(user)
            this.setState({
                article: data.article,
                articleLiked: (data.article.upvotes.indexOf(user._id) != -1),
                isAuthor: (data.article.author_id === user._id),
                isLoading: false
            });
        });
    }

    handleLike = () => {
        const articleId = this.props.match.params.articleId;
        const { user } = this.props;
        console.log(user)
        if(Object.keys(user).length > 0){
            axios.post('http://localhost:8000/api/articles/vote',{
                _id: articleId
            })
            .then((res) => {
                let data = res.data;
                this.setState({
                    article: data.article
                });
            });
    
            this.setState(prevState => ({
                articleLiked: !prevState.articleLiked
            }));
        }else{
            this.setState({
                isPopupOpen: true
            });
        }
    }

    handleClosePopup = () => {
        this.setState({
            isPopupOpen: false
        });
    }

    render() {
        const { article, isLoading, isAuthor, articleLiked, isPopupOpen } = this.state;
        return (
            <div>
                <div className="app_container jumbotron">
                    {isLoading ? 
                    <LoadingSpinner /> :
                    <div>
                        <h1 className="display-4">{article.title}</h1>
                        <p className="lead">By {article.author_name}</p>
                        <p className="lead">
                            {isAuthor ? <Link to={`/article/edit/${article._id}`}>Edit</Link> : <span></span> }
                        </p>
                        <hr className="my-4" />
                        <p>{article.body}</p>
                        <Chip label={article.keyword} variant="outlined" />
                        <br />
                        <div>
                            <IconButton aria-label="delete" className="thumbs_up" onClick={this.handleLike}>
                                {articleLiked ? <ThumbUpAltIcon style={{cursor: 'pointer'}} color="primary" fontSize="large" /> :
                                <ThumbUpAltOutlinedIcon style={{cursor: 'pointer'}} color="primary" fontSize="large"/>
                                }
                            </IconButton>
                            <span style={{color: '#3f50b5', fontSize: 25, verticalAlign: 'middle','marginLeft': 10}}>{article.upvotes.length}</span>
                        </div>
                        <br />
                        <hr />
                        <CommentSection comments={article.comments} />   
                    </div>    
                    }
                </div>
                <Dialog
                    open={isPopupOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClosePopup}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"User not logged in"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        You must be logged in to Like or Comment on a post.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.handleClosePopup}>
                                Close
                        </Button>
                        <Link to="/account/create-account">
                            <Button color="primary">
                                Create New Account
                            </Button>
                        </Link>
                        <Link to="/account/login">
                            <Button color="primary">
                                Login
                            </Button>
                        </Link>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps,null)(ViewArticle);