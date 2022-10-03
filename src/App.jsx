import { useState, useEffect } from 'react'
import { Note } from './Note'
import { getAllNotes, createNote } from './Services'

function App () {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getAllNotes()
      .then(notes => {
        setNotes(notes)
        setLoading(false)
      })
  }, [])

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const noteToAddToState = {
      title: newNote,
      body: newNote,
      userId: 1
    }

    createNote(noteToAddToState)
      .then((note) => {
        setNotes([...notes, note])
      })

    setNewNote('')
  }

  return (
    <div>
      <h1>Notes</h1>
      {
        loading ? 'Cargando' : ''
      }
      <ol className='App'>
        {
          notes.map(note => <Note key={note.id} {...note} />)
        }
      </ol>

      <form onSubmit={handleSubmit}>
        <input type='text' onChange={handleChange} value={newNote} />
        <button type='submit'>Crear nota</button>
      </form>
    </div>
  )
}

export default App
