document.addEventListener("DOMContentLoaded", () => {
  const notesSection = document.querySelector('.notesSection');
  const createBtn = document.querySelector('.btn');

  // ✅ Render function — creates and displays a single note
  function renderNote(noteContent = "", noteId = null) {
    const noteWrapper = document.createElement("div");
    noteWrapper.className = "input-box";

    const editableText = document.createElement("div");
    editableText.className = "note-text";
    editableText.setAttribute("contenteditable", "true");
    editableText.textContent = noteContent;

    const saveBtn = document.createElement("button");
    saveBtn.className = "save-btn";
    saveBtn.textContent = "Save Note";

    saveBtn.addEventListener("click", async () => {
      const content = editableText.textContent.trim();
      if (!content) {
        alert("Note cannot be empty!"); //Add the save button
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const res = await fetch("http://localhost:3000/api/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ content })
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

    const faTrash = document.createElement("i");
    faTrash.className = "fa-solid fa-trash";

    faTrash.addEventListener("click", async () => {
      if (!noteId) {
        noteWrapper.remove(); // fallback if no ID
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:3000/api/notes/${noteId}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        const data = await res.json();
        if (res.ok) {
          noteWrapper.remove(); // remove from UI
        } else {
          alert(data.msg || "Error deleting note");
        }
      } catch (error) {
        console.error("Delete error:", error);
        alert("Failed to delete note");
      }
    });

    noteWrapper.appendChild(editableText);
    noteWrapper.appendChild(saveBtn);
    noteWrapper.appendChild(faTrash);

    notesSection.appendChild(noteWrapper);
  }

  // ✅ Load saved notes from backend
  async function loadNotes() {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch("http://localhost:3000/api/notes", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      notesSection.innerHTML = ""; // clear existing notes

      const data = await res.json();
      if (res.ok && Array.isArray(data.notes)) {
        data.notes.forEach(note => {
          renderNote(note.content, note._id); // pass noteId
        });
      } else {
        console.error("Failed to load notes:", data.msg);
      }
    } catch (error) {
      console.error("Error loading notes:", error);
    }
  }

  if (createBtn) {
    createBtn.addEventListener("click", () => {
      console.log("Create Note button clicked");
      renderNote(); // no ID yet
    });
  }

  loadNotes(); // Load notes on page load
});