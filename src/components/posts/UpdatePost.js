import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { updatePost } from '../../api/post'
import { Redirect, withRouter } from 'react-router-dom'

class UpdatePost extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      text: '',
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

  updatePost(this.state, match.params.id, user)
    .then(() => this.setState({ updated: true }))
    .then(() => {
      msgAlert({
        heading: 'Post Updated',
        message: 'Woo Updated',
        variant: 'success'
      })
    })
    .catch((error) => {
      msgAlert({
        heading: 'Post Update Fail',
        message: 'Post error: ' + error.message,
        variant: 'danger'
      })
    })
}

render () {
  if (this.state.updated) {
    return <Redirect to={'/home/'} />
  }

  return (
    <Form onSubmit={this.handleSubmit}>
      <Form.Group controlId='title'>
        <Form.Label>Post Subject</Form.Label>
        <Form.Control
          required
          name='title'
          value={this.state.title}
          placeholder='Update Subject'
          onChange={this.handleChange}
        />
      </Form.Group>
      <Form.Group controlId='text'>
        <Form.Label>Update your Post</Form.Label>
        <Form.Control
          required
          name='text'
          value={this.state.text}
          placeholder='Update Post'
          onChange={this.handleChange}
        />
      </Form.Group>
      <Button type='submit'>Submit</Button>
    </Form>
  )
}
}

export default withRouter(UpdatePost)
