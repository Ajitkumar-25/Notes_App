import React from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import { useState } from "react";

const AddNotes = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleclick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "",
    });
    props.showAlert("added successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container my-3">
        <h2>Add a Notes</h2>
        <form className="my-3">
          <div className="form-group my-3">
            <label htmlFor="exampleInputTitle">Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Title"
              id="title"
              name="title"
              onChange={onChange}
              minLength={5}
              required value={note.title}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="exampleInputDescription">Description</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Detail Description here"
              id="description"
              name="description"
              onChange={onChange}
              minLength={5}
              required  value={note.description}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputTag ">Tag</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Notes Tag (if any)"
              id="tag"
              name="tag"
              onChange={onChange}
              minLength={5}
              required value={note.tag}
            />
          </div>
          <div className="form-check my-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me to confirm
            </label>
          </div>
          <button
            disabled={note.title.length < 5 || note.description.length < 5}
            type="submit"
            className="btn btn-success"
            onClick={handleclick}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNotes;
