import Telescope from 'meteor/nova:lib';
import { ModalTrigger } from "meteor/nova:core";
import Posts from "meteor/nova:posts";
import React, { PropTypes, Component } from 'react';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import { Link } from 'react-router';
// import { Button } from 'react-bootstrap';
// import moment from 'moment';
// import Users from 'meteor/nova:users';

class IssuesStoriesItem extends Telescope.components.PostsItem {

  render() {

    const post = this.props.post;

    let postClass = "posts-item";
    if (post.sticky) postClass += " posts-sticky";

    // console.log(post)
    // console.log(post.user)

    return (
      <div className={postClass}>

        <div className="posts-item-vote">
          <Telescope.components.Vote post={post} />
        </div>
        <div className="card">
          <div className="posts-item-content">

            <h3 className="posts-item-title">
              <Link to={Posts.getLink(post)} className="posts-item-title-link" target={Posts.getLinkTarget(post)}>
                {post.title}
              </Link>
              {this.renderCategories()}
            </h3>

            <div className="posts-item-meta">
              {post.user? <div className="posts-item-user"><Telescope.components.UsersAvatar user={post.user} size="small"/><Telescope.components.UsersName user={post.user}/></div> : null}
              <div className="posts-item-date">{post.postedAt ? <FormattedRelative value={post.postedAt}/> : <FormattedMessage id="posts.dateNotDefined"/>}</div>
              <div className="posts-item-comments">
                <Link to={Posts.getPageUrl(post)}>
                  <FormattedMessage id="comments.count" values={{count: post.commentCount}}/>
                </Link>
              </div>
              {this.renderActions()}
            </div>

          </div>
        </div>

        {this.renderCommenters()}


      </div>
    )
  }
}

IssuesStoriesItem.propTypes = {
  post: React.PropTypes.object.isRequired
}

IssuesStoriesItem.contextTypes = {
  currentUser: React.PropTypes.object
};

export default IssuesStoriesItem;
