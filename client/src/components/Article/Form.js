import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

let keywords = ['Sports', 'Music', 'Arts', 'Education', 'Technology', 'Software'];

class Form extends React.Component {
  
  state = {
      title: '',
      body: '',
      author: '',
      keyword: '',
      error: ''
  };

  componentDidMount(){
    const { articleId } = this.props;
    axios(`http://localhost:8000/api/articles/${articleId}`)
    .then(res => {
      let data = res.data;
      this.setState({
        title: data.article.title,
        body: data.article.body,
        author: data.article.author,
        keyword: data.article.keyword
      });
    });
  }

  handleCancel = () => {
    const { onCancel } = this.props;
    this.setState({
      title: '',
      body: '',
      author: '',
      keyword: ''
    });
    onCancel();
  }

  handleSubmit = () => {
    const { onSubmit, articleToEdit, onEdit } = this.props;
    const { title, body, author, keyword } = this.state;

    if(title === '' || body === '' || author === '' || keyword === ''){
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
            keyword
        })
        .then((res) => onSubmit(res.data))
        .then(() => this.setState({
            title: '',
            body: '',
            author: '',
            keyword: '',
            error: ''
        }));
    } else {
        //Update Blog
        return axios(`http://localhost:8000/api/articles/${articleToEdit._id}`,{
            method: "PATCH",
            data: {
                title,
                body,
                author,
                keyword
            },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*'
            },
        })
        .then((res) => onEdit(res.data))
    }
  }

  handleChangeField = (key, event) => {
    this.setState({
      [key]: event.target.value,
    });
  }

  render() {
    const { articleToEdit } = this.props;
    const { title, body, author, keyword, error } = this.state;

    return (
      <div className="col-12">
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
        <select className="form-control" value={keyword} onChange={(ev) => this.handleChangeField('keyword', ev)}>
          <option value="" disabled defaultValue>Select Keyword</option>
          {keywords.map((keyword,index) => {
            return <option key={index} value={keyword}>{keyword}</option>
          })}
        </select>
        <textarea
          onChange={(ev) => this.handleChangeField('body', ev)}
          className="form-control my-3"
          placeholder="Article Body"
          value={body}
          style={{height: 220}}>
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