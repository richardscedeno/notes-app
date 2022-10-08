import axios from 'axios'

const baseURL = 'http://localhost:3001/api/notes'

let token = null

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export const getAllNotes = () => {
  return (
    // axios.get('https://jsonplaceholder.typicode.com/posts')
    axios.get(baseURL)
      .then(response => {
        const { data } = response
        return data
        // return response.data
      })
  )
}

// export const createNote = ({ title, body, userId }) => {
//   return (
//     axios.post('https://jsonplaceholder.typicode.com/posts', { title, body, userId })
//       .then((response) => {
//         const { data } = response
//         return data
//       })
//   )
// }
export const createNote = ({ content, important }) => {
  console.log('desde create', token)
  const config = {
    headers: {
      Authorization: token
    }
  }
  return (
    axios.post(baseURL, { content, important }, config)
      .then((response) => {
        const { data } = response
        return data
      })
  )
}
