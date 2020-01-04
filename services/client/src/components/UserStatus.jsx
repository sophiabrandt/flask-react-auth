import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class UserStatus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      username: '',
    }
  }

  componentDidMount() {
    this.getUserStatus()
  }

  getUserStatus() {
    const options = {
      url: `${process.env.REACT_APP_USERS_SERVICE_URL}/auth/status`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${window.localStorage.getItem('authToken')}`,
      },
    }

    return axios(options)
      .then(res => {
        this.setState({
          email: res.data.data.email,
          username: res.data.data.username,
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/login" />
    }
    return (
      <div>
        <ul>
          <li>
            <strong>Email:</strong>&nbsp;
            <span data-testid="user-email">{this.state.email}</span>
          </li>
          <li>
            <strong>Username:</strong>&nbsp;
            <span data-testid="user-username">{this.state.username}</span>
          </li>
        </ul>
      </div>
    )
  }
}

UserStatus.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
}

export default UserStatus
