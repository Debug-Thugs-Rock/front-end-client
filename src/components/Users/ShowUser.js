import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { showUser } from '../../api/users'

class ShowUser extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: null
    }
  }

  componentDidMount () {
    const { match, user, msgAlert } = this.props
    showUser(match.params.id, user)
      .then((res) =>
      // this.setState({

      // })
        console.log(res)
      )
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

  render () {
    // if (this.state.post === null) {
    // return 'Loading...'
    // }
    // const { title, text, owner } = this.state.post
    // const { user, history, match } = this.props
    return (
      <>
        <h1>Profile</h1>
      </>
    )
  }
}

export default withRouter(ShowUser)
