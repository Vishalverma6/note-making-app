const express = require("express");
const { createNote, updateNote, getAllNote, deleteNote, searchNotes } = require("../controllers/Note");
const { auth } = require("../middlewares/auth");
const router = express.Router();


// routes for creating note 
router.post("/createNote",auth,createNote);

// routes for updating note 
router.put("/updateNote",auth,updateNote);

// route for getting All Note 
router.get("/getAllNote", auth,getAllNote);

// route for deleting the Note 
router.delete("/deleteNote", auth,deleteNote);

// routes for search Routes 
router.get("/searchNote",auth,searchNotes);

module.exports = router;