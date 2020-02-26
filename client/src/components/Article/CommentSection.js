import React from 'react';
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

class CommentSection extends React.Component {
    // const [article, setArticle] = useState({});
    // const [isAuthor, setIsAuthor] = useState(false);
    // const [isLoading, setIsLoading] = useState(false);
    // const [isCommentLoading, setIsCommentLoading] = useState(false);
    // const [commentValue, setCommentValue] = useState('');

    state = {
        article: {},
        isAuthor: false,
        isLoading: true,
        isCommentLoading: false,
        commentValue: ''
    };

    handleCommentText = (key, event) => {
        this.setState({
            [key]: event.target.value,
        });
    }

    render() {
        const { comments } = this.props;
        const { commentValue } = this.state;
        //const classes = useStyles();
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
                <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                Submit
                </Button>
                <hr />
                <List style={{width: '100%'}}>
                    <ListItem alignItems="flex-start" style={{cursor: 'pointer'}}>
                        <ListItemAvatar>
                        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
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
                            {" Wish I could come, but I'm out of town this…"}
                            </React.Fragment>
                        }
                        />

                    </ListItem>
                    <Divider variant="inset" component="li" />
                </List>
            </div> 
        );
    }
}

const mapStateToProps = state => ({
  articles: state.home.articles,
});

export default connect(mapStateToProps, null)(CommentSection);