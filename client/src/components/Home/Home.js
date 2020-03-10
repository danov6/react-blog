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
      <div className="site-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12">
              <h2>Recent Posts</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="entry2">
                <a href="single.html"><img src="media/img_1.jpg" alt="Image" className="img-fluid rounded" /></a>
                <div className="excerpt">
                <span className="post-category text-white bg-secondary mb-3">Politics</span>

                <h2><a href="single.html">The AI magically removes moving objects from videos.</a></h2>
                <div className="post-meta align-items-center text-left clearfix">
                  <figure className="author-figure mb-0 mr-3 float-left"><img src="media/person_1.jpg" alt="Image" className="img-fluid" /></figure>
                  <span className="d-inline-block mt-1">By <a href="#">Carrol Atkinson</a></span>
                  <span>&nbsp;-&nbsp; July 19, 2019</span>
                </div>
                
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo sunt tempora dolor laudantium sed optio, explicabo ad deleniti impedit facilis fugit recusandae! Illo, aliquid, dicta beatae quia porro id est.</p>
                  <p><a href="#">Read More</a></p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="entry2">
                <a href="single.html"><img src="media/img_2.jpg" alt="Image" className="img-fluid rounded" /></a>
                <div className="excerpt">
                <span className="post-category text-white bg-success mb-3">Nature</span>

                <h2><a href="single.html">The AI magically removes moving objects from videos.</a></h2>
                <div className="post-meta align-items-center text-left clearfix">
                  <figure className="author-figure mb-0 mr-3 float-left"><img src="media/person_1.jpg" alt="Image" className="img-fluid" /></figure>
                  <span className="d-inline-block mt-1">By <a href="#">Carrol Atkinson</a></span>
                  <span>&nbsp;-&nbsp; July 19, 2019</span>
                </div>
                
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo sunt tempora dolor laudantium sed optio, explicabo ad deleniti impedit facilis fugit recusandae! Illo, aliquid, dicta beatae quia porro id est.</p>
                  <p><a href="#">Read More</a></p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="entry2">
                <a href="single.html"><img src="media/img_3.jpg" alt="Image" className="img-fluid rounded" /></a>
                <div className="excerpt">
                <span className="post-category text-white bg-warning mb-3">Travel</span>

                <h2><a href="single.html">The AI magically removes moving objects from videos.</a></h2>
                <div className="post-meta align-items-center text-left clearfix">
                  <figure className="author-figure mb-0 mr-3 float-left"><img src="media/person_1.jpg" alt="Image" className="img-fluid" /></figure>
                  <span className="d-inline-block mt-1">By <a href="#">Carrol Atkinson</a></span>
                  <span>&nbsp;-&nbsp; July 19, 2019</span>
                </div>
                
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo sunt tempora dolor laudantium sed optio, explicabo ad deleniti impedit facilis fugit recusandae! Illo, aliquid, dicta beatae quia porro id est.</p>
                  <p><a href="#">Read More</a></p>
                </div>
              </div>
            </div>


            <div className="col-lg-4 mb-4">
              <div className="entry2">
                <a href="single.html"><img src="media/img_1.jpg" alt="Image" className="img-fluid rounded" /></a>
                <div className="excerpt">
                <span className="post-category text-white bg-secondary mb-3">Politics</span>

                <h2><a href="single.html">The AI magically removes moving objects from videos.</a></h2>
                <div className="post-meta align-items-center text-left clearfix">
                  <figure className="author-figure mb-0 mr-3 float-left"><img src="media/person_1.jpg" alt="Image" className="img-fluid" /></figure>
                  <span className="d-inline-block mt-1">By <a href="#">Carrol Atkinson</a></span>
                  <span>&nbsp;-&nbsp; July 19, 2019</span>
                </div>
                
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo sunt tempora dolor laudantium sed optio, explicabo ad deleniti impedit facilis fugit recusandae! Illo, aliquid, dicta beatae quia porro id est.</p>
                  <p><a href="#">Read More</a></p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="entry2">
                <a href="single.html"><img src="media/img_2.jpg" alt="Image" className="img-fluid rounded" /></a>
                <div className="excerpt">
                <span className="post-category text-white bg-success mb-3">Nature</span>

                <h2><a href="single.html">The AI magically removes moving objects from videos.</a></h2>
                <div className="post-meta align-items-center text-left clearfix">
                  <figure className="author-figure mb-0 mr-3 float-left"><img src="media/person_1.jpg" alt="Image" className="img-fluid" /></figure>
                  <span className="d-inline-block mt-1">By <a href="#">Carrol Atkinson</a></span>
                  <span>&nbsp;-&nbsp; July 19, 2019</span>
                </div>
                
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo sunt tempora dolor laudantium sed optio, explicabo ad deleniti impedit facilis fugit recusandae! Illo, aliquid, dicta beatae quia porro id est.</p>
                  <p><a href="#">Read More</a></p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="entry2">
                <a href="single.html"><img src="media/img_4.jpg" alt="Image" className="img-fluid rounded" /></a>
                <div className="excerpt">
                <span className="post-category text-white bg-danger mb-3">Sports</span>

                <h2><a href="single.html">The AI magically removes moving objects from videos.</a></h2>
                <div className="post-meta align-items-center text-left clearfix">
                  <figure className="author-figure mb-0 mr-3 float-left"><img src="media/person_1.jpg" alt="Image" className="img-fluid" /></figure>
                  <span className="d-inline-block mt-1">By <a href="#">Carrol Atkinson</a></span>
                  <span>&nbsp;-&nbsp; July 19, 2019</span>
                </div>
                
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo sunt tempora dolor laudantium sed optio, explicabo ad deleniti impedit facilis fugit recusandae! Illo, aliquid, dicta beatae quia porro id est.</p>
                  <p><a href="#">Read More</a></p>
                </div>
              </div>
            </div>


            <div className="col-lg-4 mb-4">
              <div className="entry2">
                <a href="single.html"><img src="media/img_1.jpg" alt="Image" className="img-fluid rounded" /></a>
                <div className="excerpt">
                <span className="post-category text-white bg-success mb-3">Nature</span>

                <h2><a href="single.html">The AI magically removes moving objects from videos.</a></h2>
                <div className="post-meta align-items-center text-left clearfix">
                  <figure className="author-figure mb-0 mr-3 float-left"><img src="media/person_1.jpg" alt="Image" className="img-fluid" /></figure>
                  <span className="d-inline-block mt-1">By <a href="#">Carrol Atkinson</a></span>
                  <span>&nbsp;-&nbsp; July 19, 2019</span>
                </div>
                
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo sunt tempora dolor laudantium sed optio, explicabo ad deleniti impedit facilis fugit recusandae! Illo, aliquid, dicta beatae quia porro id est.</p>
                  <p><a href="#">Read More</a></p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="entry2">
                <a href="single.html"><img src="media/img_2.jpg" alt="Image" className="img-fluid rounded" /></a>
                <div className="excerpt">
                <span className="post-category text-white bg-danger mb-3">Sports</span>
                <span className="post-category text-white bg-secondary mb-3">Tech</span>

                <h2><a href="single.html">The AI magically removes moving objects from videos.</a></h2>
                <div className="post-meta align-items-center text-left clearfix">
                  <figure className="author-figure mb-0 mr-3 float-left"><img src="media/person_1.jpg" alt="Image" className="img-fluid" /></figure>
                  <span className="d-inline-block mt-1">By <a href="#">Carrol Atkinson</a></span>
                  <span>&nbsp;-&nbsp; July 19, 2019</span>
                </div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo sunt tempora dolor laudantium sed optio, explicabo ad deleniti impedit facilis fugit recusandae! Illo, aliquid, dicta beatae quia porro id est.</p>
                  <p><a href="#">Read More</a></p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="entry2">
                <a href="single.html"><img src="media/img_4.jpg" alt="Image" className="img-fluid rounded" /></a>
                <div className="excerpt">
                <span className="post-category text-white bg-danger mb-3">Sports</span>
                <span className="post-category text-white bg-warning mb-3">Lifestyle</span>

                <h2><a href="single.html">The AI magically removes moving objects from videos.</a></h2>
                <div className="post-meta align-items-center text-left clearfix">
                  <figure className="author-figure mb-0 mr-3 float-left"><img src="media/person_1.jpg" alt="Image" className="img-fluid" /></figure>
                  <span className="d-inline-block mt-1">By <a href="#">Carrol Atkinson</a></span>
                  <span>&nbsp;-&nbsp; July 19, 2019</span>
                </div>
                
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo sunt tempora dolor laudantium sed optio, explicabo ad deleniti impedit facilis fugit recusandae! Illo, aliquid, dicta beatae quia porro id est.</p>
                  <p><a href="#">Read More</a></p>
                </div>
              </div>
            </div>
          </div>
          <div className="row text-center pt-5 border-top">
            <div className="col-md-12">
              <div className="custom-pagination">
                <span>1</span>
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">4</a>
                <span>...</span>
                <a href="#">15</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section bg-light">
        <div className="container">

          <div className="row align-items-stretch retro-layout">
            
            <div className="col-md-5 order-md-2">
              <a href="single.html" className="hentry img-1 h-100 gradient" style={{backgroundImage: "url('media/img_4.jpg')"}}>
                <span className="post-category text-white bg-danger">Travel</span>
                <div className="text">
                  <h2>The 20 Biggest Fintech Companies In America 2019</h2>
                  <span>February 12, 2019</span>
                </div>
              </a>
            </div>

            <div className="col-md-7">
              <a href="single.html" className="hentry img-2 v-height mb30 gradient" style={{backgroundImage: "url('media/img_1.jpg')"}}>
                <span className="post-category text-white bg-success">Nature</span>
                <div className="text text-sm">
                  <h2>The 20 Biggest Fintech Companies In America 2019</h2>
                  <span>February 12, 2019</span>
                </div>
              </a>
              
              <div className="two-col d-block d-md-flex">
                <a href="single.html" className="hentry v-height img-2 gradient" style={{backgroundImage: "url('media/img_2.jpg')"}}>
                  <span className="post-category text-white bg-primary">Sports</span>
                  <div className="text text-sm">
                    <h2>The 20 Biggest Fintech Companies In America 2019</h2>
                    <span>February 12, 2019</span>
                  </div>
                </a>
                <a href="single.html" className="hentry v-height img-2 ml-auto gradient" style={{backgroundImage: "url('media/img_3.jpg')"}}>
                  <span className="post-category text-white bg-warning">Lifestyle</span>
                  <div className="text text-sm">
                    <h2>The 20 Biggest Fintech Companies In America 2019</h2>
                    <span>February 12, 2019</span>
                  </div>
                </a>
              </div>  
            </div>
          </div>
        </div>
      </div>    
    </div>
    );
  }
}

const getStyle = keyword => {
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

const mapStateToProps = state => ({
  articles: state.home.articles,
});

const mapDispatchToProps = dispatch => ({
  onLoad: data => dispatch({ type: 'HOME_PAGE_LOADED', data })
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);