/* eslint-disable indent */
/* eslint-disable no-tabs */
import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { createPost } from '../../api/post'

class CreatePost extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      text: ''
    }
  }

	handleChange = (event) =>
    this.setState({
        [event.target.name]: event.target.value
	})

	handleSubmit = (event) => {
	event.preventDefault()
	event.target.reset()

	const { user, msgAlert } = this.props

	createPost(this.state, user)
    .then(() => {
       msgAlert({
    heading: 'New Post Created',
	message: 'Woo Created',
	variant: 'success'
  })
	})
 .catch((error) => {
 msgAlert({
	heading: 'Post Creation Fail',
	message: 'Post error: ' + error.message,
	variant: 'danger'
	})
    })
    }

	render () {
	return (
 <Form onSubmit={this.handleSubmit}>
	      <Form.Group controlId='title'>
	        <Form.Label>New Post</Form.Label>
	        <Form.Control
 required
name='title'
value={this.state.title}
placeholder='New Post Subject'
	onChange={this.handleChange}
  />
	      </Form.Group>
	      <Form.Group controlId='text'>
	        <Form.Label>Whats on your mind? </Form.Label>
	        <Form.Control
 required
 name='text'
value={this.state.text}
 placeholder='Your Post'
onChange={this.handleChange}
  />
	      </Form.Group>
	      <Button type='submit'>Submit</Button>
	    </Form>
 )
	}
}

export default CreatePost
