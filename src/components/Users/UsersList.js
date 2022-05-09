import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { indexUsers } from '../../api/users'
import { Bubble } from '../Style/Bubble'

// style={ styleBlock} for username width
const styleBlock = {
  maxWidth: '200px',
  wordWrap: 'break-word'
}

// style={ styleLinks} for links
const styleLinks = {
  textDecoration: 'none',
  color: 'white'
}

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
          <Link style={ styleLinks} to={`/profile/${user._id}`}>
            <Bubble key={user._id} >
              <h3 style={ styleBlock}>{user.username}</h3>
            </Bubble>
          </Link>
        </>
      ))
    }
    return (
      <>
        <div >
          <h3 >Find Bubble Feed</h3>
          <ul>{userJSX}</ul>
        </div>
      </>
    )
  }
}

export default withRouter(UsersList)
