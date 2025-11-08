document.addEventListener("DOMContentLoaded", () => {
    const notesSection = document.querySelector('.notesSection');
  const createBtn = document.querySelector('.btn');

// Render function — creates and displays a single note
function renderNote(noteContent = "") {
  const noteWrapper = document.createElement("div");
  noteWrapper.className = "input-box";

  const editableText = document.createElement("div");
  editableText.className = "note-text"; // note text area
  editableText.setAttribute("contenteditable", "true");
  editableText.textContent = noteContent;

  // Save button
  const saveBtn = document.createElement("button");
  saveBtn.className = "save-btn";
  saveBtn.textContent = "Save Note";

  saveBtn.addEventListener("click", async () => {
    const noteContent = editableText.textContent.trim(); // get the note content
    if (!noteContent) {
      alert("Note cannot be empty!");
      return;
    }

    try {
      const token = localStorage.getItem('token'); // get JWT token from local storage
      const res = await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ content: noteContent }) //Send note content to backend
      });

      const data = await res.json();
      if (res.ok) {
        alert("Note saved successfully!");
      } else {
        alert(data.msg || "Error saving note");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to save note");
    }
  });

  // Trash icon
  const faTrash = document.createElement("i");
  faTrash.className = "fa-solid fa-trash";
  faTrash.addEventListener("click", () => noteWrapper.remove());

  // Add all elements into note box
  noteWrapper.appendChild(editableText);
  noteWrapper.appendChild(saveBtn);
  noteWrapper.appendChild(faTrash);

  // Append the note box to the notes section
  notesSection.appendChild(noteWrapper);
}

 
});