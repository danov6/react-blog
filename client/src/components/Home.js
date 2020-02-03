import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

class Home extends React.Component {

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
    const { articles } = this.props;

    return (
      <div className="container">
        <div className="row pt-5">
          <div className="col-12 col-lg-6 offset-lg-3">
            <h1 className="text-center">My blog of interests</h1>
          </div>
        </div>
        <div className="row pt-5">
          <div className="col-12 col-lg-10 offset-lg-2">
            {articles.map((article,index) => {
              return (
                <div className="media" key={index}>
                  <img src="https://via.placeholder.com/100" className="align-self-start mr-3" alt={article.title} />
                  <div className="media-body">
                    <h5 className="mt-0">{article.title}</h5>
                    <p>{article.body}</p>
                    <p className="mt-5 text-muted"><b>{article.author}</b> {moment(new Date(article.createdAt)).fromNow()}</p>
                  </div>
                      <Link to="/edit">
                        <button onClick={() => this.handleEdit(article)} className="btn btn-primary mx-3" id="edit_button">
                          Edit
                        </button>
                      </Link>
                </div>
              )
            })}
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);