/* eslint-disable indent */
/* eslint-disable no-tabs */
import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import { createPost } from '../../api/post'
import { withRouter } from 'react-router-dom'

// style={ styleBlock}
const styleBlock = {
  color: '#03045e'
}

class CreatePost extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      text: '',
			owner: '',
			likes: 0,
			comments: []
    }
  }

	handleChange = (event) =>
    this.setState({
        [event.target.name]: event.target.value
	})

	handleSubmit = (event) => {
	event.preventDefault()

	const { user, msgAlert, history } = this.props

	createPost(this.state, user)
		.then(() => history.push('/posts'))
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
	this.setState({
			title: '',
			text: ''
	})
    }

	render () {
	return (
		<>
			<h4 style={styleBlock}>{this.props.user.username}</h4>
			<Form onSubmit={this.handleSubmit}>
				<Form.Group controlId='title'>
					<Form.Label style={styleBlock}>New Post</Form.Label>
					<Form.Control
						required
						name='title'
						value={this.state.title}
						placeholder='New Post Subject'
						onChange={this.handleChange}
					/>
				</Form.Group>
				<Form.Group controlId='text'>
					<Form.Label style={styleBlock}>Whats on your mind? </Form.Label>
					<Form.Control
						required
						name='text'
						value={this.state.text}
						placeholder='Your Post'
						onChange={this.handleChange}
					/>
				</Form.Group>
				<button type='submit' className='btn btn-secondary'>
					Submit
				</button>
			</Form>
		</>
	)
	}
}

export default withRouter(CreatePost)
