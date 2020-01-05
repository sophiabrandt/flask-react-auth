import React from 'react'
import PropTypes from 'prop-types'

const UsersList = props => {
  return (
    <div>
      <table className="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Email</th>
            <th>Username</th>
            {props.isAuthenticated && <th />}
          </tr>
        </thead>
        <tbody>
          {props.users.map(user => {
            return (
              <tr key={user.email}>
                <td>{user.email}</td>
                <td className="username">{user.username}</td>
                <td>
                  <button
                    className="button is-danger is-small"
                    onClick={() => props.removeUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
  removeUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}

export default UsersList
