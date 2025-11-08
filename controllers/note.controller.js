
const Note = require('../models/note.model');


//CREATE NOTE CONTROLLER 
const createNote = async (req, res) => {

    try {
        const { content } = req.body; //gets the note content
        if (!content) {
            return res.status(400).json({ msg: "Note content is required" });
        }
        const newNote = await Note.create({
            userId: req.user.id, // get user ID from verified token
            content
        })
        res.status(201).json({ msg: "Note created successfully", note: newNote })

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }


};

//GET USER NOTES CONTROLLER
const getUserNotes = async (req, res) => {

    try {
        const userId  = req.user.id; // get user ID from verified token
        const notes = await Note.find({userId}); // find all the note linked to the user
        res.status(200).json({notes}); // send the notes to frontend
        
    } catch (error) {
        console.error(error);
    }
  };

//UPDATE NOTE CONTROLLER(put)
   const updateNote = async (req, res) => {
       try {
        const {id} = req.params; // get the note id from url
        const {content} = req.body; // get the updated content from request body
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            {content},
            {new: true} // return the updated note
        );

        if (!updatedNote) {
            return res.status(404).json({msg: "Note not found"});
        }

        res.status(200).json({
            msg: "Note updated successfully", 
            note: updatedNote
        });

       } catch (error) {
        
        res.status(500).json ({message: "Error updating note" , error: error.message});
    }
   };


// DELETE a note by ID
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!note) return res.status(404).json({ msg: "Note not found" });
    res.json({ msg: "Note deleted" });
    
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});





module.exports = {
    createNote,
    getUserNotes,
    updateNote,
    deleteNote
};
