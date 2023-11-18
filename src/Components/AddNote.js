import React, { useState,useContext } from 'react'
import noteContext from '../Context/notes/noteContext'

const AddNote = (props) => {
    const context=useContext(noteContext)
    const {addnote}=context

    const [note,setNote]=useState({title:"",description:"",tag:""})

    const handleclick=(e)=>{
        e.preventDefault()
        addnote(note.title,note.description,note.tag)
        setNote({title:"",description:"",tag:""})
        props.showalert("Added Successfully","success")
    }

    const onchange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>
      <div className="container my-3">
      <h1>Add a Note</h1>
        <form  className="my-3">
          <div className="mb-3">
            <label href="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onchange}
              minLength={5} required
              value={note.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onchange}
              minLength={5} required
              value={note.description}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onchange}
              minLength={5} required
              value={note.tag}
            />
          </div>
          
          <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleclick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
