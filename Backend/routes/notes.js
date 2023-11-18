const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

//ROUTE 1 - get All the notes using : GET  "/api/notes/getuser".No login required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some errors occurs");
  }
});

//ROUTE 2 - Add a new  note using : POST  "/api/notes/addnote".No login required

router.post("/addnote",fetchuser,[
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "description must be atleast 5 character").isLength({
      min: 5,
    })
  ] ,
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savenote = await note.save();
      res.json(savenote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some errors occurs");
    }
  }
);


//ROUTE 3 - Updatew a existing Note note using : PUT  "/api/notes/updatenote".No login required

router.put("/updatenote/:id",fetchuser ,
  async (req, res) => {
    const{title,description,tag}=req.body

    try{
    //create a newNote object
    const newNote={}
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}


    //find the note to be updated
    let note=await Notes.findById(req.params.id)
    if(!note){return res.status(404).send("Not Found..")}

    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed")
    }
    note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note})
}catch (error) {
    console.error(error.message);
    res.status(500).send("some errors occurs");
  }
})


//ROUTE 4 - delete a existing Note note using : DELETE  "/api/notes/deletenote".No login required

router.delete("/deletenote/:id",fetchuser ,
  async (req, res) => {

    try{

    //find the note to be deleted
    let note=await Notes.findById(req.params.id)
    if(!note){return res.status(404).send("Not Found..")}

    //allows deletion only if user owns this note
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed")
    }
    note=await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success":" note has been deleted",note:note})
}catch (error) {
    console.error(error.message);
    res.status(500).send("some errors occurs");
  }
})




module.exports = router;
