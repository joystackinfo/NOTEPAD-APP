document.addEventListener("DOMContentLoaded", () => {
  const notesSection = document.querySelector('.notesSection');
  const createBtn = document.querySelector('.btn');

  createBtn.addEventListener("click", () => {
    // Create wrapper
    let noteWrapper = document.createElement("div"); // Wrapper for note
    noteWrapper.className = "input-box";

    // Create editable text area
    let editableText = document.createElement("div");
    editableText.className = "note-text";
    editableText.setAttribute("contenteditable", "true"); // Make it editable
 
       
    //CREATE SAVE BUTTON
      let saveBtn = document.createElement("button");
      saveBtn.className = "save-btn"; // Save button
      saveBtn.textContent= "Save Note";

      saveBtn.addEventListener("click", async () => {
        const noteContent = editableText.textContent.trim(); // Get the note content
        if (!noteContent) {
          alert("Please, write something first!"); // log message
          return;
        }
        console.log("Saving note:", noteContent);
        alert("Note saved successfully!"); // Alert user



      });


    // Create trash icon
    let faTrash = document.createElement("i");
    faTrash.className = "fa-solid fa-trash";

    faTrash.addEventListener("click", () => {
      noteWrapper.remove();
    });

    // Append elements
    noteWrapper.appendChild(editableText);
    noteWrapper.appendChild(faTrash);
    notesSection.appendChild(noteWrapper);
    notesSection.appendChild(saveBtn);
  });


});