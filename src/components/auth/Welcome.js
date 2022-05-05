import React, { Fragment } from 'react'

// style={ styleBlock}
const styleBlock = {
  color: '#03045e',
  textAlign: 'center'
}

const Welcome = () => (
  <>
    <section style={ styleBlock}>
      <br></br>
      <h3>Wecome to Bubble!</h3>
      <br></br>
      <h5>Sign Up To Use Bubble</h5>

      <h6>Once Signed in: </h6>
      <p>Click on Home to See everyone&apos;s posts</p>
      <p>The Profile Tab show just your posts</p>
      <p>Click on all users to see who&apos;s on Bubble</p>
      <p>Click Change Password to update your password</p>
      <p>Click Sign Out To End Your Bubble Session</p>
      <br></br>
      <p>Click On Bubble To See These Instructions Again</p>
    </section>
  </>
)

export default Welcome
