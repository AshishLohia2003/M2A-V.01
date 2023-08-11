import React from 'react'
import { useNavigate } from 'react-router-dom'
import supabase2 from '../supabase2'

const Homepage = ({ token }) => {
  let navigate = useNavigate()
  console.log(token)
  async function handleLogout() {
    sessionStorage.removeItem('token')
    const { error } = await supabase2.auth.signOut();
    console.log(error);
    navigate('/')
  }

  return (
    <div>
      <h3>Welcome back, {token.user.user_metadata.full_name}</h3>
      <h1>{token.user.user_metadata.database_url}</h1>
      <h1>{token.user.user_metadata.api_key}</h1>
      <button onClick={handleLogout}>Logout</button>

    </div>
  )
}

export default Homepage