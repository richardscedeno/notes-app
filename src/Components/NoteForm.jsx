import { useRef, useState } from 'react'
import { Toggable } from './Toggable'

export const NoteForm = ({ addNote, handleLogout }) => {
  const [newNote, setNewNote] = useState('')
  const toggableRef = useRef()

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const objectNote = {
      content: newNote,
      important: true
    }

    addNote(objectNote)
    setNewNote('')
    toggableRef.current.toggleVisibility()
  }

  return (
    <Toggable buttonLabel='New Note' ref={toggableRef}>
      <h3>Create a note</h3>

      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Write your note content' onChange={handleChange} value={newNote} />
        <button type='submit'>Crear nota</button>
      </form>

      <div>
        <button onClick={handleLogout}>Cerrar Sesion</button>
      </div>
    </Toggable>
  )
}
