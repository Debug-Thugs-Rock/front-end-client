import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { createComment } from '../../api/post'
import { Redirect, withRouter } from 'react-router-dom'

class CreateComment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      comment: '',
      updated: false
    }
  }

  handleChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value
    })

handleSubmit = (event) => {
  event.preventDefault()

  const { match, user, msgAlert } = this.props

  createComment(this.state, match.params.id, user)
    .then(() => this.setState({ updated: true }))
    .then(() => {
      msgAlert({
        heading: 'Comment Created',
        message: 'Woot you participated',
        variant: 'success'
      })
    })
    .catch((error) => {
      msgAlert({
        heading: 'Create Comment Fail',
        message: 'Comment error: ' + error.message,
        variant: 'danger'
      })
    })
}

render () {
  const { match } = this.props
  if (this.state.updated) {
    return <Redirect to={'/posts/' + match.params.id} />
  }

  return (
    <Form onSubmit={this.handleSubmit}>
      <Form.Group controlId='title'>
        <Form.Label>Post Comment</Form.Label>
        <Form.Control
          required
          name='comment'
          value={this.state.comment}
          placeholder='Comment'
          onChange={this.handleChange}
        />
      </Form.Group>
      <Button type='submit'>Submit</Button>
    </Form>
  )
}
}

export default withRouter(CreateComment)
