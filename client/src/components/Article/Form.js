import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import {
  Link
} from "react-router-dom";

let keywords = ['Sports', 'Music', 'Arts', 'Education', 'Technology', 'Software'];

class Form extends React.Component {
  
  state = {
      title: '',
      body: '',
      keyword: '',
      author: '',
      error: ''
  };

  componentDidMount(){
    const { articleId, user } = this.props;
    axios(`http://localhost:8000/articles/${articleId}`)
    .then(res => {
      let data = res.data;
      this.setState({
        _id: data.article._id,
        title: data.article.title,
        body: data.article.body,
        keyword: data.article.keyword,
        author: user.username
      });
    });
  }

  handleCancel = () => {
    const { onCancel } = this.props;
    this.setState({
      title: '',
      body: '',
      keyword: '',
      author: '',
      error: ''
    });
    onCancel();
  }

  handleSubmit = () => {
    const { onEdit } = this.props;
    const { _id, title, body, keyword, author } = this.state;

    if(title === '' || body === '' || keyword === '' || author === ''){
      this.setState({
        error: 'Required fields missing'
      });
      return;
    }

    //Update Blog
    return axios(`http://localhost:8000/api/articles/${_id}`,{
        method: "PATCH",
        data: {
            title,
            body,
            keyword,
            author
        },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*'
        },
    })
    .then(() => {
      window.location.pathname = `/article/view/${_id}`;
    })
    .catch((error) => {
      this.setState({
        error
      });
    });
  
  }

  handleChangeField = (key, event) => {
    this.setState({
      [key]: event.target.value,
    });
  }

  render() {
    const { _id, title, body, keyword, error } = this.state;

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
        <Link to={`/article/view/${_id}`}><button onClick={this.handleCancel} type="button" className="btn btn-link">Cancel</button></Link>
        <button onClick={this.handleSubmit} className="btn btn-primary float-right">Update</button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch({ type: 'SUBMIT_ARTICLE', data }),
  onCancel: () => dispatch({ type: 'CANCEL_EDIT' }),
});

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);