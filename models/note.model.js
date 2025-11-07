const mongoose = require('mongoose'); // include monogoose
const NoteSchema = new mongoose.Schema({ // create note schema 

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // links it to user model
        required: true
    },  // links each note to a user

    content: {
        type:String,
        required: true
    }, //stores the note text

      CreatedAt:{
        type: Date,
        default: Date.now
      }


















})

const note = mongoose.model('Note', NoteSchema);


module.exports = note;