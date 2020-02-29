import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
    const { title, keyword, body } = this.state;

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

  handleChangeEditor = (value) => {
    this.setState({
      body: value
    });
  }

  handleChangeField = (key, event) => {
    this.setState({
      [key]: event.target.value
    });
  }

  render() {
    const { title, keyword, body, error } = this.state;

    return (
      <div className="app_container col-12 col-lg-8 offset-lg-2" style={{padding: "2% 6%"}}>
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
        <select className="form-control mb-3" value={keyword} onChange={(ev) => this.handleChangeField('keyword', ev)}>
          <option value="" disabled defaultValue>Select Keyword</option>
          {keywords.map((keyword,index) => {
            return <option key={index} value={keyword}>{keyword}</option>
          })}
        </select>
        {/* <textarea
          onChange={(ev) => this.handleChangeField('body', ev)}
          className="form-control my-3"
          placeholder="Article Body"
          value={body}>
        </textarea> */}
        <CKEditor
          editor={ ClassicEditor }
          data="<p>Hello from CKEditor 5!</p>"
          value={body}
          onInit={ editor => {
              // You can store the "editor" and use when it is needed.
              console.log( 'Editor is ready to use!', editor );
          } }
          onChange={ ( event, editor ) => {
              const data = editor.getData();
              this.handleChangeEditor(data)
          } }
        />
        <Link to="/"><button onClick={this.handleCancel} type="button" className="btn btn-link my-3">Cancel</button></Link>
        {/* <Link to="/"><button onClick={this.handleSubmit} className="btn btn-primary float-right my-3">Create Blog</button></Link> */}
        <button onClick={this.handleSubmit} className="btn btn-primary float-right my-3">Create Blog</button>
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