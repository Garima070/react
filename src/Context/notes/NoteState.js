import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  

  const host = "http://localhost:5000";
  const notesinitial = [];

  const [notes, setNotes] = useState(notesinitial);
  //get all notes

   const getnote = async() => {

    //API CALL
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token":
        localStorage.getItem("token"),
    } 
  });

    const json=await response.json()
    setNotes(json)
  };


  //add a note

  const addnote= async(title, description, tag) => {

    //API CALL
  const response = await fetch(`${host}/api/notes/addnote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token":
      localStorage.getItem("token"),
    },
    body: JSON.stringify({title,description,tag}),
  });

  const note=await response.json()
    setNotes(notes.concat(note));
  };

  //delete a note

  const deletenote = async(id) => {

    //API CALL
  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "auth-token":
      localStorage.getItem("token"),
    },
  });
  const json=response.json()
  console.log(json);
  

    console.log("deleting a note  with id" + id);
    const newnotes = notes.filter((note) => {
    return  note._id !== id;
    });
    // eslint-disable-next-line
    setNotes(newnotes);
  };

  //edit a note

  const editnote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem("token"),
      },
      body: JSON.stringify({title,description,tag}),
    });
    const json=await response.json()
    console.log(json)


    let newNotes=JSON.parse(JSON.stringify(notes))

    //logic to edit note
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break
      }
    }
    setNotes(newNotes)
  };

  return (
    <noteContext.Provider value={{ notes, addnote, deletenote, editnote ,getnote}}>
      {props.children}
    </noteContext.Provider>
  );
};
export default NoteState;
