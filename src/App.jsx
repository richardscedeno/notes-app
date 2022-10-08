import { useState, useEffect } from 'react'
import { Note } from './Components/Note'
import { getAllNotes, createNote, setToken } from './Services/notes'
import { Login } from './Services/login'
import { LoginForm } from './Components/LoginForm'
import { NoteForm } from './Components/NoteForm'

function App () {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    setLoading(true)
    getAllNotes()
      .then(notes => {
        setNotes(notes)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    setToken(user.token)
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  const addNote = (objectNote) => {
    createNote(objectNote)
      .then((note) => {
        setNotes([...notes, note])
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await Login({ username, password })

      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )

      // console.log(user)
      setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Wroung credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Notes</h1>
      {
        loading ? 'Cargando' : ''
      }

      {console.log('user', user)}
      {
        user
          ? <NoteForm
              addNote={addNote}
              handleLogout={handleLogout}
            />
          : <LoginForm
              username={username}
              password={password}
              handleUsernameChange={event => setUsername(event.target.value)}
              handlePasswordChange={event => setPassword(event.target.value)}
              handleSubmit={handleLogin}
            />
      }

      <ol className='App'>
        {
          notes.map(note => <Note key={note.id} {...note} />)
        }
      </ol>
    </div>
  )
}

export default App
