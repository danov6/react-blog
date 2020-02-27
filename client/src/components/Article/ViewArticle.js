import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import moment from 'moment';
import { Helmet } from "react-helmet";

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
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

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

            this.setState({
                article: data.article,
                articleLiked: (data.article.upvotes.indexOf(user._id) !== -1),
                isAuthor: (data.article.author_id === user._id),
                isLoading: false
            });
        });
    }

    handleLike = () => {
        const articleId = this.props.match.params.articleId;
        const { user } = this.props;
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

    //TODO
    loadBody = () => {
        const { article } = this.state;
        let interval = setInterval(() => {
            if(document.querySelector('#article_content') != null){
                document.querySelector('#article_content').innerHTML = article.body;
                clearInterval(interval);
            }
        }, 500);
    }

    render() {
        const { article, isLoading, isAuthor, articleLiked, isPopupOpen } = this.state;
        return (
            <div>
                <Helmet>
                    <title>{article.title}</title>
                </Helmet>    
                <div className="app_container jumbotron">
                    {isLoading ? 
                    <LoadingSpinner /> :
                    <div>
                        <h1 className="display-4">{article.title}</h1>
                        <ListItem alignItems="flex-start" style={{paddingTop: 0, paddingBottom: 0}}>
                            <ListItemAvatar>
                            <Avatar alt={article.author_name} src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                            primary={
                                <React.Fragment>
                                    {article.author_name} {isAuthor ? "" : <Button variant="outlined" color="primary" size="small" style={{lineHeight: 1.35,paddingTop: 0, paddingBottom: 0, marginLeft: 5}}>Follow</Button>}
                                </React.Fragment>
                            }
                            secondary={
                                <React.Fragment>
                                {moment(new Date(article.createdAt)).calendar()}
                                </React.Fragment>
                            }
                            />
                        </ListItem>
                        {isAuthor ?
                        <p className="lead">
                            <Link to={`/article/edit/${article._id}`}>Edit</Link>
                        </p>
                        :
                        ""
                        }
                        <hr className="mb-4" />
                        <div id="article_content">{this.loadBody()}</div><br />
                        <Chip label={article.keyword} variant="outlined" />
                        <br /><br />
                        <div>
                            <IconButton aria-label="delete" className="thumbs_up" onClick={this.handleLike}>
                                {articleLiked ? <ThumbUpAltIcon style={{cursor: 'pointer'}} color="primary" fontSize="large" /> :
                                <ThumbUpAltOutlinedIcon style={{cursor: 'pointer'}} color="primary" fontSize="large"/>
                                }
                            </IconButton>
                            <span style={{color: '#3f50b5', fontSize: 25, verticalAlign: 'middle','marginLeft': 10}}>{article.upvotes.length}</span>
                        </div>
                        <hr />
                        <CommentSection articleId={article._id} comments={article.comments} />   
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
    return <Slide direction="down" ref={ref} {...props} />;
});

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps, null)(ViewArticle);