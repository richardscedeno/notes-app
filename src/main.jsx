import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

let notes = [
  {
    id: 1,
    content: 'Contenido 1',
    date: '2022-09-16T01:06:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Contenido 2',
    date: '2022-10-16T05:06:31.098Z',
    important: false
  },
  {
    id: 3,
    content: 'Contenido 3',
    date: '2022-10-16T05:06:31.098Z',
    important: true
  }
]


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App notes={notes} />
  </React.StrictMode>
)
