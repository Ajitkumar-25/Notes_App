import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const notesInitial=[
        {
          "_id": "64aa4d7e5eae4656a47c1d52",
          "user": "64a970086aed3d4c7d0ccf3c",
          "title": "first try",
          "description": "sample notes",
          "tag": "new entry",
          "date": "2023-07-09T06:02:38.468Z",
          "__v": 0
        },
        {
          "_id": "64aa4e4b5eae4656a47c1d57",
          "user": "64a970086aed3d4c7d0ccf3c",
          "title": "old note update test",
          "description": "Notes updated",
          "tag": "new entry 2",
          "date": "2023-07-09T06:06:03.456Z",
          "__v": 0
        },
        {
          "_id": "64aa59b3358ed1f8acc762bd",
          "user": "64a970086aed3d4c7d0ccf3c",
          "title": "fourth try",
          "description": "sample notes 4",
          "tag": "new entry 4",
          "date": "2023-07-09T06:54:43.023Z",
          "__v": 0
        },
        {
          "_id": "64aa59c6358ed1f8acc762bf",
          "user": "64a970086aed3d4c7d0ccf3c",
          "title": "fifth try",
          "description": "sample notes 5",
          "tag": "new entry 5",
          "date": "2023-07-09T06:55:02.220Z",
          "__v": 0
        },
        {
          "_id": "64aa65ab509af58720ce89fc",
          "user": "64a970086aed3d4c7d0ccf3c",
          "title": "sixth try",
          "description": "sample notes 6",
          "tag": "new entry 6",
          "date": "2023-07-09T07:45:47.948Z",
          "__v": 0
        }
      ];
      const [notes, setNotes] = useState(notesInitial)
    
return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState
