import useUser from '@/customHooks/useUser'
import React from 'react'

const user = () => {

    const {
        onSubmitHandler,      
        lastname,
        email,
        firstname,
        backerror,
    } =useUser()
  return (
    <div>
        <h1 >user</h1>
        <button onClick={onSubmitHandler}>click to get user</button>
        <h1>email:{email}</h1>
        <h2>firstname:{firstname}</h2>
        <h3>lastname:{lastname}</h3>
        <h4>error:{backerror}</h4>

        </div>
  )
}

export default user