import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import { get } from 'https';

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

  getStyle = (keyword) => {
    var keys = ['Arts', 'Education', 'Music', 'Software', 'Sports', 'Technology'].map((key,index) => {
      return index;
    })
    let style = '';
    switch(keyword) {
      case 0:
        //style = 'badge_arts';
        style = 'badge-success';
        break;
      case 1:
        //style = 'badge_education';
        style = 'badge-success';
        break;
      case 2:
        //style = 'badge_music';
        style = 'badge-warning';
        break;
      case 3:
        //style = 'badge_software';
        style = 'badge-primary';
        break;
      case 4:
        //style = 'badge_sports';
        style = 'badge-danger';
        break;
      case 5:
        //style = 'badge_technology';
        style = 'badge-info';
        break;
      default:
    }
    console.log('Keyword ' + keyword + ' made style: ' + style);
    return style;
  };

  render() {
    const { articles } = this.props;

    return (
      <div className="app_container container">
        <div>
          <div className="col-12 col-lg-6 offset-lg-3">
            <h1 className="text-center">My blog of interests</h1>
          </div>
        </div>
        <div className="row pt-5">
          <div className="col-12">
            {articles.map((article,index) => {
              return (
                <div className="media" key={index}>
                  <img src="https://via.placeholder.com/100" className="align-self-start mr-3" alt={article.title} />
                  <div className="media-body">
                    <h5 className="mt-0"><Link to={`/article/view/${article._id}`}>{article.title}</Link></h5>
                    <span className={`badge ${this.getStyle(article.keyword)}`}>{article.keyword}</span>
                    <p>{article.body.length > 200 ? article.body.substring(0,200) + '...' : article.body}</p>
                    <p className="text-muted"><b>{article.author}</b> {moment(new Date(article.createdAt)).fromNow()}</p>
                  </div>
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