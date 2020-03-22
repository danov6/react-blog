import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import {Helmet} from "react-helmet";

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

class Home extends React.Component {

  state = {
    articles: []
  };

  componentDidMount(){
    const { onLoad } = this.props;
    axios('http://localhost:8000/articles')
    .then((res) => {
      onLoad(res.data);
      this.setState({
        articles: res.data
      });
    });
  }

  render(){
    let { articles } = this.props;
    if(typeof articles[0] === "undefined") return <div></div>;
    return (
      <div className="site-wrap">
      <Helmet>Home</Helmet>
      <div className="site-section bg-light">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12">
              <h2 style={{textAlign: 'center'}}>Trending</h2>
            </div>
          </div>
          <div className="row align-items-stretch retro-layout-2">
            <div className="col-md-4">
              <Link to={`/article/view/${articles[0]._id}`} className="h-entry mb-30 v-height gradient" style={{backgroundImage: "url('media/img_1.jpg"}}>
                
                <div className="text">
                  <h2>{articles[0].title}</h2>
                  <span className="date" style={{paddingRight: 15}}>{moment(articles[0].createdAt).format('LL')}</span>
                  <span><ThumbUpAltIcon fontSize="small" />&nbsp;{articles[0].upvotes.length}</span>
                </div>
              </Link>
              <Link to={`/article/view/${articles[1]._id}`} className="h-entry v-height gradient" style={{backgroundImage: "url('media/img_2.jpg"}}>
                <div className="text">
                  <h2>{articles[1].title}</h2>
                  <span className="date" style={{paddingRight: 15}}>{moment(articles[1].createdAt).format('LL')}</span>
                  <span><ThumbUpAltIcon fontSize="small" />&nbsp;{articles[1].upvotes.length}</span>
                </div>
              </Link>
            </div>
            <div className="col-md-4">
              <Link to={`/article/view/${articles[2]._id}`} className="h-entry img-5 h-100 gradient" style={{backgroundImage: "url('media/img_v_1.jpg')"}}>
                <div className="text">
                  <div className="post-categories mb-3">
                    <span className="post-category bg-danger">{articles[2].keyword}</span>
                    {/* <span className="post-category bg-primary">Food</span> */}
                  </div>
                  <h2>{articles[2].title}</h2>
                  <span className="date" style={{paddingRight: 15}}>{moment(articles[2].createdAt).format('LL')}</span>
                  <span><ThumbUpAltIcon fontSize="small" />&nbsp;{articles[2].upvotes.length}</span>
                </div>
              </Link>
            </div>
            <div className="col-md-4">
              <Link to={`/article/view/${articles[3]._id}`} className="h-entry mb-30 v-height gradient" style={{backgroundImage: "url('media/img_3.jpg')"}}>
                <div className="text">
                  <h2>{articles[3].title}</h2>
                  <span className="date" style={{paddingRight: 15}}>{moment(articles[3].createdAt).format('LL')}</span>
                  <span><ThumbUpAltIcon fontSize="small" />&nbsp;{articles[3].upvotes.length}</span>
                </div>
              </Link>
              <a href="single.html" className="h-entry v-height gradient" style={{backgroundImage: "url('media/img_4.jpg')"}}>
                
                <div className="text">
                  <h2>The 20 Biggest Fintech Companies In America 2019</h2>
                  <span className="date">July 19, 2019</span>
                </div>
              </a>
            </div>
          </div>
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
  onLoad: data => dispatch({ type: 'HOME_PAGE_LOADED', data })
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);