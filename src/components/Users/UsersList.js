import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { indexUsers } from '../../api/users'
import { Bubble } from '../Style/Bubble'

class UsersList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users: null
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props

    indexUsers(user)
      .then((res) => this.setState({ users: res.data.users }))
      .then(console.log(this.users))
      .then(() => {
        msgAlert({
          heading: 'Welcome to Bubble Home!',
          message: 'Look at allll those users',
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
    const { users } = this.state
    console.log(this.state)

    if (users === null) {
      return 'Loading...'
    }
    // const { match } = this.props

    let userJSX
    if (users.length === 0) {
      userJSX = 'No users, create some'
    } else {
    // eslint-disable-next-line array-callback-return
      userJSX = users.map((user) => (
        <>
          <Link to={`/profile/${user._id}`}>
            <Bubble key={user._id} >
              <h3>{user.email}</h3>
            </Bubble>
          </Link>
        </>
      ))
    }
    return (
      <>
        <h3>Bubble Feed</h3>
        <ul>{userJSX}</ul>

      </>
    )
  }
}

export default withRouter(UsersList)
