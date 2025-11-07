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
          alert("Note cannot be empty!"); // log message
          return;
        }
            try {
              const token = localStorage.getItem('token'); // get usertoken from local storage
              const res = await fetch("http://localhost:3000/api/notes", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}` // include token in authorization header
                },
                body: JSON.stringify({ Content:noteContent }) // send note content in request body
              });

              const data = await res.json();
              if (res.ok) { // check if response is ok
                alert("Note saved successfully!"); // Alert user to confirm
              } else {
                alert(data.msg || "Error saving note"); // Alert user of error
              }
              
            } catch (error) {
              
        console.log(error);
        alert("Failed to save note"); 
            }
              

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