import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

class UsersList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users: null
    }
  }

  componentDidMount () {
    console.log()
  }

  render () {
    return (
      <>
        <h3>Users</h3>
        <Link><h4>{this.props.user.email}</h4></Link>
      </>
    )
  }
}

export default withRouter(UsersList)
