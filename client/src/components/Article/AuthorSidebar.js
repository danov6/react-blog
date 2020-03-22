import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const AuthorSidebar = (props) => {
    return (
        <aside className="sidebar" style={{width: '20%', display: 'inline-block', position: 'absolute', padding: '4% 3%'}}>
        {/* <div style={{textAlign: 'center'}}>
            <Avatar alt={props.article.author_name} src="/static/images/avatar/1.jpg" />
            <h6>{props.article.author_name}</h6>
        </div> */}
            <h4>Categories</h4>
            <ul className="keywords_list" style={{listStyleType: 'none', paddingInlineStart: 0}}>
                <li>{props.article.keyword}</li>
            </ul>
            <br />
            <h4>Share</h4>
            <ul className="keywords_list" style={{listStyleType: 'none', paddingInlineStart: 0, display: 'inline-flex'}}>
                <li style={{margin: 5}}><FacebookIcon /></li>
                <li style={{margin: 5}}><TwitterIcon /></li>
                <li style={{margin: 5}}><LinkedInIcon /></li>
            </ul>
        </aside>
    );
}

export default AuthorSidebar;