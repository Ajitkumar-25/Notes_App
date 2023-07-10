import React from "react";
import noteContext from "../context/notes/noteContext";
import { useContext } from "react";
const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { notes, updateNote } = props;
  return (
    <div className="col-md-3 ">
      <div className="card my-3 border-2 border-success shadow-lg ">
        <div className="card-body">
          <h3 className="card-tag">{notes.tag}</h3>
          <h5 className="card-title">{notes.title}</h5>
          <p className="card-text">{notes.description}</p>
          <i
            className="fa-solid fa-trash fa-shake mx-2"
            style={{ color: "#ff0000" }}
            onClick={() => {
              deleteNote(notes._id);
              props.showAlert("deleted successfully", "success");
            }}
          ></i>
          <i
            className="fa-solid fa-pen-to-square fa-bounce mx-2"
            style={{ color: "#198754" }}
            onClick={() => {
              updateNote(notes);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
