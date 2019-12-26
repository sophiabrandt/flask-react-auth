import React from 'react'

const UsersList = props => {
  return (
    <div>
      {props.users.map(user => {
        return (
          <p key={user.id} className="box title is-4 username">
            {user.username}
          </p>
        )
      })}
    </div>
  )
}

export default UsersList
