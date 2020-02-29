import React from 'react';
import { connect } from 'react-redux';

import Form from './Form';

const EditArticle = () => {
  return (
    <div className="app_container container">
      <div>
        <div className="col-12">
          <h1 className="text-center">Edit</h1>
        </div>
        <Form articleId={this.props.match.params.articleId} />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  articles: state.home.articles,
});

export default connect(mapStateToProps, null)(EditArticle);