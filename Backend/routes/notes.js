const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchuser = require("../Middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// Route 1 : Get all the notes using : GET "/api/notes/fetchallnotes". login Required
router.get("/fetchallnotes", fetchuser, async (req, resp) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    resp.json(notes);
  } catch (error) {
    console.error(error.message);
    resp.status(500).send("Internal Server Error");
  }
  // resp.send("hello")
});

// Route 2 : Add a new note using : POST "/api/notes/addnote". Login Required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, resp) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }
    const { title, description, tag } = req.body;
    try {
      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await notes.save();
      resp.json(savedNote);
    } catch (error) {
      console.error(error.message);
      resp.status(500).send("Internal Server Error");
    }
  }
);

// Route 3 : Update an existing note using : PUT "/api/notes/updatenote". Login Required
router.put("/updatenote/:id", fetchuser, async (req, resp) => {
  const { title, description, tag } = req.body;
  // Create a newNote object
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }
  // Find the note to be updated and update it
  let note = await Notes.findById(req.params.id);
  if (!note) {
    return resp.status(404).send("Not Found");
  }
  if (note.user.toString() !== req.user.id) {
    return resp.status(401).send("Not Allowed");
  }
  note = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  resp.json({ note });
});

module.exports = router;
