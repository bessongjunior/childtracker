import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

type Register = {
    email: string;
    password: string;
    last_name: string;
    first_name: string;
    admin_username: string;
}

export const useSignup = () => {
  const [error, setError] = useState<null | string>(null)
  const [isLoading, setIsLoading] = useState<null | boolean>(null)
  const [success, setSuccess] = useState<null | boolean>(null)
  const { dispatch } = useAuthContext()

  const signup = async ({first_name, last_name, admin_username, email, password}: Register) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    const response = await fetch('http://127.0.0.1:5000/admin/v1/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ first_name, last_name, admin_username, email, password })
    })
    const json = await response.json()

    if (response.status != 201) {
      setIsLoading(false)
      setError(json.error)
      console.log(response)
      console.log(response.json())
      console.log(json.error)
    }
    if (response.status === 201) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)

      // to auto navigate to login
      setSuccess(true)
    }
  }

  return { signup, isLoading, error, success }
}