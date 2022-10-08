import { useState, useEffect } from 'react'
import { Note } from './Note'
import { getAllNotes, createNote, setToken } from './Services/notes'
import { Login } from './Services/login'

function App () {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
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

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()

    const noteToAddToState = {
      content: newNote,
      important: true
    }

    createNote(noteToAddToState)
      .then((note) => {
        setNotes([...notes, note])
      })

    setNewNote('')
  }

  const handleLoginSubmit = async (event) => {
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

  const renderLoginForm = () => {
    return (
      <form onSubmit={handleLoginSubmit}>
        <div>
          <input
            type='text'
            value={username}
            name='username'
            placeholder='Username'
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <input
            type='password'
            value={password}
            name='password'
            placeholder='Password'
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button>Login</button>
      </form>
    )
  }

  const renderCreateNoteForm = () => {
    return (
      <>
        <form onSubmit={addNote}>
          <input type='text' placeholder='Write your note content' onChange={handleChange} value={newNote} />
          <button type='submit'>Crear nota</button>
        </form>

        <div>
          <button onClick={handleLogout}>Cerrar Sesion</button>
        </div>
      </>
    )
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
          ? renderCreateNoteForm()
          : renderLoginForm()
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
