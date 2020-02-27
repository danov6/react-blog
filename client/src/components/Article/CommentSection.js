import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
//import Typography from '@material-ui/core/Typography';

import LoadingSpinner from './../LoadingSpinner';

class CommentSection extends React.Component {
    // const [article, setArticle] = useState({});
    // const [isAuthor, setIsAuthor] = useState(false);
    // const [isLoading, setIsLoading] = useState(false);
    // const [isCommentLoading, setIsCommentLoading] = useState(false);
    // const [commentValue, setCommentValue] = useState('');

    state = {
        comments: [],
        isAuthor: false,
        isCommentButtonLoading: false,
        commentValue: '',
        error: ''
    };

    componentDidMount(){
        this.setState({
            comments: this.props.comments
        });
    }

    handleCommentText = (key, event) => {
        this.setState({
            [key]: event.target.value,
        });
    }

    handleSubmit = () => {
        const { commentValue } = this.state;
        const { articleId } = this.props;
        this.setState({
            isCommentButtonLoading: true
        })

        if(commentValue === ''){
            this.setState({
                error: 'Contents are blank.',
                isCommentButtonLoading: false
            });
            return;
        }
        axios.post('http://localhost:8000/api/comments/add',{
            _id: articleId,
            body: commentValue
        })
        .then((res) => {
            let data = res.data;
            this.setState({
                comments: data.comments,
                isCommentButtonLoading: false
            });
        })
        .catch((err) => {
            this.setState({
                error: err,
                isCommentButtonLoading: false
            });
        });
    }

    render() {
        let { comments } = this.props;
        const { commentValue, isCommentButtonLoading } = this.state;
        //const classes = useStyles();

        let commentList = comments.map((c,i) => {
            return (
                <ListItem alignItems="flex-start" style={{cursor: 'pointer'}} key={i}>
                    <ListItemAvatar>
                    <Avatar alt={c.author.username} src="/static/images/avatar/2.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                    primary="Summer BBQ"
                    secondary={
                        <React.Fragment>
                        {/* <Typography
                            component="span"
                            variant="body2"
                            style={{display: 'inline'}}
                            color="textPrimary"
                        >
                            to Scott, Alex, Jennifer
                        </Typography> */}
                        {c.body}
                        </React.Fragment>
                    }
                    />
                </ListItem>
            );
        })

        return (
            <div>
                <i>Comments ({comments.length})</i>
                <br />
                <TextField
                id="outlined-multiline-static"
                label="Write a response"
                multiline
                rows="3"
                // placeholder="Write a response.."
                variant="outlined"
                name="comment"
                style={{width: '100%', margin: '15px 0px'}}
                onChange={(ev) => this.handleCommentText('commentValue', ev)}
                value={commentValue}
                />
                {isCommentButtonLoading ? <LoadingSpinner /> :
                <Button variant="contained" color="primary" onClick={this.handleSubmit}>Submit</Button>
                }
                <hr />
                <List style={{width: '100%'}}>
                    {commentList}
                    <Divider variant="inset" component="li" />
                </List>
            </div> 
        );
    }
}

export default CommentSection;