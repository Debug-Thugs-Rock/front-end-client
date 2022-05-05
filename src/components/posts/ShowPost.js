import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { deletePost, showPost, deleteComment, updateLikes } from '../../api/post'
import Button from 'react-bootstrap/Button'

// style={ styleBlock}
const styleBlock = {
  color: '#03045e'
}

class ShowPost extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      text: '',
      likes: 0,
      updated: false
    }
  }

  componentDidMount () {
    const { match, user, msgAlert } = this.props

    showPost(match.params.id, user)
      .then((res) => this.setState({
        title: res.data.posts.title,
        text: res.data.posts.text,
        likes: res.data.posts.likes,
        updated: true,
        owner: res.data.posts.owner,
        commentCopy: res.data.posts.comments
      }))
      .then(() => {
        msgAlert({
          heading: 'Viewing Post',
          message: 'Woot success',
          variant: 'success'
        })
      })
      .catch((error) => {
        msgAlert({
          heading: 'View failed',
          message: 'Error message: ' + error.message,
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

upvote = () => {
  this.setState(prevState => {
    return { likes: prevState.likes + 1 }
  })
}

commentDelete = (commentId) => {
  const { match, user, msgAlert } = this.props

  const commentID = { commentId: commentId }
  deleteComment(commentID, match.params.id, user)
    .then(() => {
      msgAlert({
        heading: 'Comment Deleted',
        message: 'bye bye',
        variant: 'success'
      })
    })
    .catch((error) => {
      msgAlert({
        heading: 'Create Delete Fail',
        message: 'Comment Delete error: ' + error.message,
        variant: 'danger'
      })
    })
}

// save the users likes when they leave the page
componentWillUnmount () {
  const { match, user } = this.props
  updateLikes(this.state, match.params.id, user)
}

render () {
  if (this.state.post === null) {
    return 'Loading...'
  }
  // const { title, text, owner } = this.state.post
  const { user, history, match } = this.props
  return (
    <>
      <div style={ styleBlock}>
        <h3>Viewing Post:</h3>
        <h4>{this.state.title}</h4>
        <p>{this.state.text}</p>
        <ul>
          { this.state.commentCopy?.map(comment => <li key= { comment._id } data-id= {comment._id}>{ comment.comment }  <button type="button" className="btn btn-secondary btn-sm" onClick={ () => this.commentDelete(comment._id) }>｡∘oOo</button></li>)}
        </ul>

        <p>bubbled {this.state.likes}x</p>
        {user._id === this.state.owner && (
          <>
            <Button onClick={this.handleDelete}>Delete</Button>
            <Button onClick={() => history.push(`/posts/${match.params.id}/edit`)}>Update</Button>
          </>
        )}
        <Button onClick={() => history.push(`/posts/${match.params.id}/comments`)}>Comment</Button>
        <Button onClick= {this.upvote}>∘˚˳°</Button>
      </div>
    </>
  )
}
}

export default withRouter(ShowPost)
