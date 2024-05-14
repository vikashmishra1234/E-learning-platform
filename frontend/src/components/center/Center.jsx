import React from 'react'
import {Link} from 'react-router-dom'
const Center = () => {
  return (
    <section className='center-section'>
        <h1>Get Your Study Item</h1>
        <Link to={'/work/?q=previousyear'}>Previous Year Paper</Link>
        <Link to={'/work/?q=quantum'}>All Aktu Quantum</Link>
        <Link to={'/work/?q=notes'}>Notes</Link>
        <Link to={'/community'}>Community</Link>
        <Link to={'/add/notes'}>AddNotes</Link>
    </section>
  )
}

export default Center