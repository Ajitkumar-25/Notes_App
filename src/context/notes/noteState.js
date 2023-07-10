import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //Get all notes

  const getNotes = async () => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhOTcwMDg2YWVkM2Q0YzdkMGNjZjNjIn0sImlhdCI6MTY4ODgyNjk5NH0.aJeETDNlP87hvzQH67W9LxzXXtpNrvPMTU2NcLY9f3o",
      },
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhOTcwMDg2YWVkM2Q0YzdkMGNjZjNjIn0sImlhdCI6MTY4ODgyNjk5NH0.aJeETDNlP87hvzQH67W9LxzXXtpNrvPMTU2NcLY9f3o",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    // console.log("Adding a new note");

    const note = {
      _id: "64aa4e4b5eae4656a47c1d57",
      user: "64a970086aed3d4c7d0ccf3c",
      title: title,
      description: description,
      tag: tag,
      date: "2023-07-09T06:06:03.456Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //Delete a note
  const deleteNote = async (id) => {
    //API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DElETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhOTcwMDg2YWVkM2Q0YzdkMGNjZjNjIn0sImlhdCI6MTY4ODgyNjk5NH0.aJeETDNlP87hvzQH67W9LxzXXtpNrvPMTU2NcLY9f3o",
      },
    });
    const json = await response.json();
    console.log(json);

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //to do api call
    // console.log("Editing a note" + id);
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhOTcwMDg2YWVkM2Q0YzdkMGNjZjNjIn0sImlhdCI6MTY4ODgyNjk5NH0.aJeETDNlP87hvzQH67W9LxzXXtpNrvPMTU2NcLY9f3o",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    //Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
