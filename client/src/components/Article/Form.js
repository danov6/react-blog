import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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

  handleDelete = () => {
    return axios.post(`http://localhost:8000/api/articles/remove`,{
      _id: this.state._id
    })
    .then(() => {
      console.log('Article deleted..');
      window.location.pathname = "/";
    });
  }

  handleSubmit = () => {
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

  handleChangeEditor = (value) => {
    this.setState({
      body: value
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
        <CKEditor
          editor={ ClassicEditor }
          data={body}
          value={body}
          onChange={ ( event, editor ) => {
              const data = editor.getData();
              this.handleChangeEditor(data)
          } }
        />
        <Link to={`/article/view/${_id}`}><button type="button" className="btn btn-link">Cancel</button></Link>
        <button onClick={() => this.handleDelete(_id)} type="button" className="btn btn-danger">Delete</button>
        <button onClick={this.handleSubmit} className="btn btn-primary float-right">Update</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(Form);