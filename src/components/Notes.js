import React from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNotes from "./AddNotes";
import { useEffect, useRef } from "react";
import { useState } from "react";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refclose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
    
    // console.log("Updating the note", notes);
  };

  const handleclick = (e) => {
    // console.log("updatig the old values with new ones", note);
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refclose.current.click();
    props.showAlert("updated successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNotes
        showAlert={props.showAlert}
      />

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        ref={ref}
      >
        Launch static backdrop modal
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Edit Notes
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="form-group my-3">
                  <label htmlFor="exampleInputTitle">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Title"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange} minLength={5} required
                  />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="exampleInputDescription">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Detail Description here"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange} minLength={5} required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputTag ">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Notes Tag (if any)"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange} minLength={5} required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refclose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={note.etitle.length<5||note.edescription.length<5}
                onClick={handleclick}
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>


      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
          {notes.length === 0 && "No Notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} notes={note} updateNote={updateNote}
              showAlert={props.showAlert}/>
          );
        })}
      </div>
    </>
  );
};

export default Notes;
