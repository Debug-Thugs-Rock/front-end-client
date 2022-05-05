import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { indexPosts } from '../../api/post'

// style block for post divs
const postStyle = {
  background: '#0dcaf0',
  borderRadius: '20px',
  padding: '1.5em',
  margin: '10px',
  color: '#03045e'
}
// style={ styleBlock}
const styleBlock = {
  color: '#03045e'
}

class ShowUser extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: null,
      posts: null
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props

    indexPosts(user)
      .then((res) => this.setState({ posts: res.data.posts }))
      .then(() => {
        msgAlert({
          heading: 'Welcome to Bubble Home!',
          message: 'Look at allll those Posts',
          variant: 'success'
        })
      })
      .catch((error) => {
        msgAlert({
          heading: 'Index Failed',
          message: 'Index error:' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { posts } = this.state

    if (posts === null) {
      return 'Loading...'
    }

    let postJSX
    if (posts.length === 0) {
      postJSX = 'No posts, create some'
    } else {
      // console.log(posts)
      // eslint-disable-next-line array-callback-return
      // eslint-disable-next-line eqeqeq
      postJSX = posts.filter(post => post.owner._id == this.props.match.params.id).map((post) => (
        <div style={ postStyle} key={post._id}>
          <h3>{post.owner.username}</h3>
          <h4>{post.title}</h4>
          <p>{post.text}</p>
          <>
            <Link to={`/posts/${post._id}`}><button type="button" style={ styleBlock} className="btn btn-light" >View Post</button></Link>
          </>
        </div>
      )).reverse()
    }
    return (
      <>
        <h3 style={ styleBlock}>Bubble Feed</h3>
        <ul>{postJSX}</ul>
      </>
    )
  }
}

export default withRouter(ShowUser)
