import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import {
  Link
} from "react-router-dom";

let keywords = ['Sports', 'Music', 'Arts', 'Education', 'Technology', 'Software'];

class CreateArticle extends React.Component {
  
  state = {
      title: '',
      keyword: '',
      body: '',
      author: '',
      error: ''
  };

  componentDidMount(){
    let { user } = this.props;

    if(typeof user['username'] !== "undefined"){
      this.setState({
        author: user['username']
      });
    }
  }

  handleCancel = () => {
    const { onCancel } = this.props;
    this.setState({
      title: '',
      keyword: '',
      body: '',
      author: ''
    });
    onCancel();
  }

  handleSubmit = () => {
    const { onSubmit } = this.props;
    const { title, keyword, body, author } = this.state;

    if(title === '' || body === '' || keyword === ''){
      this.setState({
        error: 'Required fields missing'
      });
      return;
    }

    //Add Blog
    return axios.post('http://localhost:8000/api/articles/add', {
        title,
        keyword,
        body,
    })
    .then((res) => onSubmit(res.data));
  }

  handleChangeField = (key, event) => {
    this.setState({
      [key]: event.target.value,
    });
  }

  render() {
    const { title, keyword, body, error } = this.state;

    return (
      <div className="app_container col-12 col-lg-8 offset-lg-2">
        { error !== '' ?
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            {error}
          </div>
         :
         <div></div>
        }
        <h1 style={{textAlign: 'center'}}>Create something</h1>
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
          value={body}>
        </textarea>
        <Link to="/"><button onClick={this.handleCancel} type="button" className="btn btn-link">Cancel</button></Link>
        <Link to="/"><button onClick={this.handleSubmit} className="btn btn-primary float-right">Create Blog</button></Link>
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
export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);