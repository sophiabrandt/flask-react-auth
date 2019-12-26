import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom'
import AddUser from './components/AddUser'
import UsersList from './components/UsersList'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      users: [],
      username: '',
      email: '',
    }
    this.addUser = this.addUser.bind(this)
    this.handleChange = this.handleChange.bind(this)
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

  addUser(event) {
    event.preventDefault()
    const data = {
      username: this.state.username,
      email: this.state.email,
    }
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

  handleChange(event) {
    const obj = {}
    obj[event.target.name] = event.target.value
    this.setState(obj)
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-one-third">
              <br />
              <h1 className="title is-1">Users</h1>
              <hr />
              <br />
              <AddUser
                addUser={this.addUser}
                handleChange={this.handleChange}
                email={this.state.email}
                username={this.state.username}
              />
              <hr />
              <br />
              <UsersList users={this.state.users} />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
