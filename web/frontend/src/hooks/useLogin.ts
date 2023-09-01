import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

type Login = {
    email: string;
    password: string;
}

export const useLogin = () => {
  const [error, setError] = useState<null | string>(null)
  const [isLoading, setIsLoading] = useState<null | boolean>(null)
  const [success, setSuccess] = useState<null | boolean>(null)
  const { dispatch } = useAuthContext()

  const login = async ({email, password}: Login) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    const response = await fetch('http://127.0.0.1:5000/admin/v1/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
      console.log(response)
      console.log(email, password)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    }
    if (response.status === 201) {
      // to auto navigate to login
      setSuccess(true)
    }
  }

  return { login, isLoading, error, success }
}