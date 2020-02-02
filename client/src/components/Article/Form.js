import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';

class Form extends React.Component {
  
    state = {
        title: '',
        body: '',
        author: ''
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

  handleSubmit = () => {
    const { onSubmit, articleToEdit, onEdit } = this.props;
    const { title, body, author } = this.state;

    if(!articleToEdit) {
      return axios.post('http://localhost:8000/api/articles', {
        title,
        body,
        author,
      })
        .then((res) => onSubmit(res.data))
        .then(() => this.setState({ title: '', body: '', author: '' }));
    } else {
      // return axios.patch(`http://localhost:8000/api/articles/${articleToEdit._id}`, {
      //   title,
      //   body,
      //   author,
      // })
      //   .then((res) => onEdit(res.data))
      //   .then(() => this.setState({ title: '', body: '', author: '' }));

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
        }).then((res) => onEdit(res.data))
        .then(() => this.setState({ title: '', body: '', author: '' }));
  
    }
  }

  handleChangeField = (key, event) => {
    this.setState({
      [key]: event.target.value,
    });
  }

  render() {
    const { articleToEdit } = this.props;
    const { title, body, author } = this.state;

    return (
      <div className="col-12 col-lg-6 offset-lg-3">
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
        <button onClick={this.handleSubmit} className="btn btn-primary float-right">{articleToEdit ? 'Update' : 'Submit'}</button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch({ type: 'SUBMIT_ARTICLE', data }),
  onEdit: data => dispatch({ type: 'EDIT_ARTICLE', data }),
});

const mapStateToProps = state => ({
  articleToEdit: state.home.articleToEdit,
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);