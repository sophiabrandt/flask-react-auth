import React, { Component } from 'react'
import axios from 'axios'
import { Route, Switch } from 'react-router-dom'

import UsersList from './components/UsersList'
import AddUser from './components/AddUser'
import About from './components/About'
import NavBar from './components/NavBar'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

class App extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      title: 'Testdriven App',
      accessToken: null,
    }
    this.addUser = this.addUser.bind(this)
    this.handleLoginFormSubmit = this.handleLoginFormSubmit.bind(this)
    this.handleRegisterFormSubmit = this.handleRegisterFormSubmit.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  componentDidMount() {
    this.getUsers()
  }

  getUsers() {
    axios
      .get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`)
      .then(res => {
        this.setState({ users: res.data.data.users })
      })
      .catch(err => {
        console.log(err)
      })
  }

  addUser(data) {
    axios
      .post(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`, data)
      .then(() => {
        this.getUsers()
        this.setState({ username: '', email: '' })
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleRegisterFormSubmit(data) {
    const url = `${process.env.REACT_APP_USERS_SERVICE_URL}/auth/register`
    axios
      .post(url, data)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleLoginFormSubmit(data) {
    const url = `${process.env.REACT_APP_USERS_SERVICE_URL}/auth/login`
    axios
      .post(url, data)
      .then(res => {
        this.setState({ accessToken: res.data.auth_token })
        this.getUsers()
      })
      .catch(err => {
        console.log(err)
      })
  }

  isAuthenticated() {
    if (this.state.accessToken) {
      return true
    }
    return false
  }

  render() {
    return (
      <div>
        <NavBar title={this.state.title} />
        <section className="section">
          <div className="container">
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
                        isAuthenticated={this.isAuthenticated}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/login"
                    render={() => (
                      <LoginForm
                        handleLoginFormSubmit={this.handleLoginFormSubmit}
                        isAuthenticated={this.isAuthenticated}
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
