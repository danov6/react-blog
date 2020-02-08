import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

import Form from './Article/Form';

class Edit extends React.Component {

  componentDidMount() {
    const { onLoad } = this.props;

    axios('http://localhost:8000/api/articles')
      .then((res) => onLoad(res.data));
  }

  handleDelete = (id) => {
    const { onDelete } = this.props;

    return axios.delete(`http://localhost:8000/api/articles/${id}`)
      .then(() => onDelete(id));
  }

  handleEdit = (article) => {
    const { setEdit } = this.props;

    setEdit(article);
  }

  render() {
    return (
      <div className="app_container container">
        <div>
          <div className="col-12 col-lg-6 offset-lg-3">
            <h1 className="text-center">Edit</h1>
          </div>
          <Form articleId={this.props.match.params.articleId} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.home.articles,
});

const mapDispatchToProps = dispatch => ({
  onLoad: data => dispatch({ type: 'HOME_PAGE_LOADED', data }),
  onDelete: id => dispatch({ type: 'DELETE_ARTICLE', id }),
  setEdit: article => dispatch({ type: 'SET_EDIT', article }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);