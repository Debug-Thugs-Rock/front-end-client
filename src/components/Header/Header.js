import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, NavLink } from 'react-router-dom'

// style={ styleBlock}
const styleBlock = {
  color: '#03045e',
  margin: '0px 10px'
}

const signOutBlockRight = {
  color: '#03045e',
  position: 'absolute',
  right: '10px'
}
const changePasswordBlockRight = {
  color: '#03045e',
  position: 'absolute',
  right: '100px'
}
const welcomeStyle = {
  color: '#fff',
  marginRight: '15px',
  fontWeight: '700'
}

const authenticatedOptions = (
  <Fragment>
    <NavLink to='/home' style={styleBlock} className='nav-link'>
 Home {' '}
    </NavLink>
    <NavLink to='/profile' style={styleBlock} className='nav-link'>
 Profile{' '}
    </NavLink>
    <NavLink to='/users-list' style={styleBlock} className='nav-link'>
 All Users
    </NavLink>
    <NavLink to='/change-password' style={changePasswordBlockRight} className='nav-link'>
Change Password
    </NavLink>
    <NavLink to='/sign-out' style={signOutBlockRight} className='nav-link'>
Sign Out
    </NavLink>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <NavLink to='/sign-up' style={ styleBlock} className='nav-link'>Sign Up</NavLink>
    <NavLink to='/sign-in' style={ styleBlock} className='nav-link'>Sign In</NavLink>
  </Fragment>
)

// const alwaysOptions = (
//   <Fragment>
//     <NavLink exact to='/' className='nav-link'>Home</NavLink>
//   </Fragment>
// )

const Header = ({ user }) => (
  <Navbar bg='info' variant='dark' expand='md'>
    <Navbar.Brand>
      <Link to='/' style={{ color: '#03045e', textDecoration: 'none' }}>Bubble</Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls='basic-navbar-nav' />
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='ml-auto'>
        {user && (
          <span className='navbar-text mr-2' style={ welcomeStyle} >Welcome, {user.username}</span>
        )}
        {/* {alwaysOptions} */}
        {user ? authenticatedOptions : unauthenticatedOptions}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
