import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

class Form extends React.Component {
  
  state = {
      title: '',
      body: '',
      author: '',
      error: ''
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.articleToEdit) {
      this.setState({
        title: nextProps.articleToEdit.title,
        body: nextProps.articleToEdit.body,
        author: nextProps.articleToEdit.author,
      });
    }
  }

  handleCancel = () => {
    const { onCancel } = this.props;
    this.setState({
      title: '',
      body: '',
      author: ''
    });
    onCancel();
  }

  handleSubmit = () => {
    const { onSubmit, articleToEdit, onEdit } = this.props;
    const { title, body, author } = this.state;

    if(title === '' || body === '' || author === ''){
      this.setState({
        error: 'Required fields missing'
      });
      return;
    }

    if(!articleToEdit) {
        //Add Blog
        return axios.post('http://localhost:8000/api/articles', {
            title,
            body,
            author,
        })
        .then((res) => onSubmit(res.data))
        .then(() => this.setState({
            title: '',
            body: '',
            author: '',
            error: ''
        }));
    } else {
        //Update Blog
        return axios(`http://localhost:8000/api/articles/${articleToEdit._id}`,{
            method: "PATCH",
            data: {
                title,
                body,
                author
            },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*'
            },
        })
        .then((res) => onEdit(res.data))
        .then(() => this.setState({
            title: '',
            body: '',
            author: '',
            error: ''
        }));
    }
  }

  handleChangeField = (key, event) => {
    this.setState({
      [key]: event.target.value,
    });
  }

  render() {
    const { articleToEdit } = this.props;
    const { title, body, author, error } = this.state;

    return (
      <div className="col-12 col-lg-6 offset-lg-3">
        { error !== '' ?
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            {error}
          </div>
         :
         <div></div>
        }
        <input
          onChange={(ev) => this.handleChangeField('title', ev)}
          value={title}
          className="form-control my-3"
          placeholder="Article Title"
        />
        <textarea
          onChange={(ev) => this.handleChangeField('body', ev)}
          className="form-control my-3"
          placeholder="Article Body"
          value={body}>
        </textarea>
        <input
          onChange={(ev) => this.handleChangeField('author', ev)}
          value={author}
          className="form-control my-3"
          placeholder="Article Author"
        />
        {articleToEdit ? <Link to="/"><button onClick={this.handleCancel} type="button" className="btn btn-link">Cancel</button></Link> : <div></div> }
        <Link to="/"><button onClick={this.handleSubmit} className="btn btn-primary float-right">{articleToEdit ? 'Update' : 'Submit'}</button></Link>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch({ type: 'SUBMIT_ARTICLE', data }),
  onEdit: data => dispatch({ type: 'EDIT_ARTICLE', data }),
  onCancel: () => dispatch({ type: 'CANCEL_EDIT' }),
});

const mapStateToProps = state => ({
  articleToEdit: state.home.articleToEdit,
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);