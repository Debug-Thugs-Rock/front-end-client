import React, { Component } from 'react'
import { indexPosts, deletePost } from '../../api/post'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'

// const bubbleStyle = {
//   border: '1px solid red',
//   // backgroundColor: '#fff',
//   padding: '20px',
//   borderRadius: '30px',
//   // minWidth: '40px',
//   // maxWidth: '220px',
//   // minHeight: '40px',
//   margin: '20px',
//   position: 'relative',
//   // alignItems: 'center',
//   // justifyContent: 'center',
//   textAlign: 'center',
//   '&:after': {
//     content: '\'\'',
//     border: '30px solid blue',
//     width: '100px',
//     height: '100px'
//   }
// }

const Bubble = styled.div`
border: 1px solid red;
  background-color:#fff;
  padding: 20px;
  border-radius: 30px;
  min-width: 40px;
  max-width: 220px;
  min-height: 40px;
  margin: 20px;
  align-items:center;
  text-align:center;
  &:before,
  &:hover {
    border: 5px solid purple;
  }
  
`

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
