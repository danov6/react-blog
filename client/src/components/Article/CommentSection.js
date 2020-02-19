import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class EditArticle extends React.Component {

    state = {
        article: {},
        isAuthor: false,
        isLoading: true,
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
                onChange={(ev) => this.handleCommentText('comment', ev)}
                value={commentValue}
                />
                <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                Submit
                </Button>
            </div> 
        );
    }
}

const mapStateToProps = state => ({
  articles: state.home.articles,
});

export default connect(mapStateToProps, null)(EditArticle);