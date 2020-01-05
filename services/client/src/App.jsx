import React, { Component } from 'react'
import axios from 'axios'
import { Route, Switch } from 'react-router-dom'

import UsersList from './components/UsersList'
import UserStatus from './components/UserStatus'
import AddUser from './components/AddUser'
import About from './components/About'
import Message from './components/Message'
import NavBar from './components/NavBar'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

class App extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      title: 'Testdriven App',
      isAuthenticated: false,
      messageType: null,
      messageText: null,
    }
  }

  componentDidMount() {
    this.getUsers()
  }

  getUsers = () => {
    axios
      .get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`)
      .then(res => {
        this.setState({ users: res.data.data.users })
      })
      .catch(err => {
        console.log(err)
      })
  }

  addUser = data => {
    axios
      .post(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`, data)
      .then(() => {
        this.getUsers()
        this.setState({ username: '', email: '' })
        this.createMessage('success', 'User added.')
      })
      .catch(err => {
        console.log(err)
        this.createMessage('danger', 'That user already exists.')
      })
  }

  handleRegisterFormSubmit = data => {
    const url = `${process.env.REACT_APP_USERS_SERVICE_URL}/auth/register`
    axios
      .post(url, data)
      .then(res => {
        console.log(res.data)
        this.createMessage('success', 'You have registered successfully.')
      })
      .catch(err => {
        console.log(err)
        this.createMessage('danger', 'That user already exists.')
      })
  }

  handleLoginFormSubmit = data => {
    const url = `${process.env.REACT_APP_USERS_SERVICE_URL}/auth/login`
    axios
      .post(url, data)
      .then(res => {
        this.setState(
          { isAuthenticated: true },
          window.localStorage.setItem('authToken', res.data.auth_token)
        )
        this.createMessage('success', 'You have logged in successfully.')
        this.getUsers()
      })
      .catch(err => {
        console.log(err)
        this.createMessage('danger', 'Incorrect email and/or password.')
      })
  }

  logoutUser = () => {
    this.setState(
      { isAuthenticated: false },
      window.localStorage.removeItem('authToken')
    )
    this.createMessage('success', 'You have logged out.')
  }

  createMessage = (type = 'success', text = 'Sanity Check') => {
    this.setState({
      messageType: type,
      messageText: text,
    })
    setTimeout(() => {
      this.removeMessage()
    }, 3000)
  }

  removeMessage = () => {
    this.setState({
      messageType: null,
      messageText: null,
    })
  }

  render() {
    return (
      <div>
        <NavBar
          title={this.state.title}
          logoutUser={this.logoutUser}
          isAuthenticated={this.state.isAuthenticated}
        />
        <section className="section">
          <div className="container">
            {this.state.messageType && this.state.messageText && (
              <Message
                messageType={this.state.messageType}
                messageText={this.state.messageText}
                removeMessage={this.removeMessage}
              />
            )}
            <div className="columns">
              <div className="column is-half">
                <br />
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => (
                      <div>
                        <h1 className="title is-1">Users</h1>
                        <hr />
                        <br />
                        {/* updated */}
                        <AddUser addUser={this.addUser} />
                        <br />
                        <br />
                        <UsersList users={this.state.users} />
                      </div>
                    )}
                  />
                  <Route exact path="/about" component={About} />
                  <Route
                    exact
                    path="/register"
                    render={() => (
                      <RegisterForm
                        handleRegisterFormSubmit={this.handleRegisterFormSubmit}
                        isAuthenticated={this.state.isAuthenticated}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/login"
                    render={() => (
                      <LoginForm
                        handleLoginFormSubmit={this.handleLoginFormSubmit}
                        isAuthenticated={this.state.isAuthenticated}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/status"
                    render={() => (
                      <UserStatus
                        isAuthenticated={this.state.isAuthenticated}
                      />
                    )}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default App
