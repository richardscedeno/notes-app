import axios from 'axios'

const baseURL = 'http://localhost:3001/api/login'

export const Login = async (credentials) => {
  const { data } = await axios.post(baseURL, credentials)
  return data
}
