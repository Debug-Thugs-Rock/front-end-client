import React, { Component } from 'react'
import { indexPosts, deletePost } from '../../api/post'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { Bubble } from '../Style/Bubble'

class IndexPost extends Component {
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
    postJSX = posts.map((post) => (
      <div key={post._id}>
        <h3>{post.owner?.username}</h3>
        <h4>{post.title}</h4>
        <p>{post.text}</p>
        <>
          <Link to={`/posts/${post._id}`}><Button>View Post</Button></Link>
        </>
      </div>
    )).reverse()
  }
  return (
    <>
      <h3>Bubble Feed</h3>
      <ul>{postJSX}</ul>

    </>
  )
}
}

export default IndexPost
