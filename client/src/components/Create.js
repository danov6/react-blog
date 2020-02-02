import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';

class Create extends React.Component {
  
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
    const { onSubmit } = this.props;
    const { title, body, author } = this.state;

    if(title === '' || body === '' || author === ''){
      this.setState({
        error: 'Required fields missing'
      });
      return;
    }

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
  }

  handleChangeField = (key, event) => {
    this.setState({
      [key]: event.target.value,
    });
  }

  render() {
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
        <button onClick={this.handleCancel} type="button" className="btn btn-link">Cancel</button>
        <button onClick={this.handleSubmit} className="btn btn-primary float-right">Create Blog</button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch({ type: 'SUBMIT_ARTICLE', data }),
  onCancel: () => dispatch({ type: 'CANCEL_EDIT' }),
});

export default connect(null, mapDispatchToProps)(Create);