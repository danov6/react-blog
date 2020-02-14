import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  Link
} from "react-router-dom";

class Home extends React.Component {

  componentDidMount() {
    const { onLoad } = this.props;

    axios('http://localhost:8000/articles')
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
    let style = '';
    if(keyword === 'Arts'){
      style = 'badge-success';
    }else if(keyword === 'Education'){
      style = 'badge-success';
    }else if(keyword === 'Music'){
      style = 'badge-warning';
    }else if(keyword === 'Software'){
      style = 'badge-primary';
    }else if(keyword === 'Sports'){
      style = 'badge-danger';
    }else if(keyword === 'Technology'){
      style = 'badge-info';
    }
    return style;
  };

  render() {
    const { articles } = this.props;

    return (
      <div className="app_container container">
        <div>
          <div className="col-12 col-lg-6 offset-lg-3">
            <h1 className="text-center">Test</h1>
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
                    <span className={`badge ${this.getStyle(article.keyword[0])}`}>{article.keyword[0]}</span>
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