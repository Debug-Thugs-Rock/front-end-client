import React, { Component } from 'react'
import { indexPosts, deletePost } from '../../api/post'
import { Link } from 'react-router-dom'

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

class ProfileIndexPost extends Component {
  constructor (props) {
    super(props)

    this.state = {
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

handleDelete = () => {
  const { match, user, msgAlert, history } = this.props

  deletePost(match.params.id, user)
    .then(() => history.push('/posts'))
    .then(() => {
      msgAlert({
        heading: 'Delete success',
        message: 'Woot deleted',
        variant: 'success'
      })
    })
    .catch((error) => {
      msgAlert({
        heading: 'Delete fail',
        message: 'Delete error: ' + error.message,
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
    // eslint-disable-next-line array-callback-return
    // eslint-disable-next-line eqeqeq
    postJSX = posts.filter(post => post.owner._id == this.props.user._id).map((post) => (
      <div style={ postStyle} key={post._id}>
        <h3>{this.props.user.username}</h3>
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
      <h3>Your Bubble Feed</h3>
      <ul>{postJSX}</ul>
    </>
  )
}
}

export default ProfileIndexPost
