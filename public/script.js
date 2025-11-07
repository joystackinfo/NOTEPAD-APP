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

 

  // Register User
  const registerForm = document.getElementById('registerForm');
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const age = document.getElementById('age').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
      const res = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, age, password })
      });

      const data = await res.json();
      if (res.ok) {
        alert("Registration successful!");
        registerForm.reset();
      } else {
        alert(data.msg || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while registering");
    }
  });

  // Login User
  const loginForm = document.getElementById('loginForm'); // select login form
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    try {
      const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token); //save JWT token
        alert("Login successful!");

        loginForm.style.display = "none";
        document.querySelector('.container').style.display = "block";

        // Fetch and render user notes after login
        try {
          const token = data.token; // get JWT token from login response
          const notesRes = await fetch("http://localhost:3000/api/notes", {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          const notes = await notesRes.json(); // get notes from response

          if (notesRes.ok && Array.isArray(notes)) {
            notes.forEach(note => renderNote(note.content)); // get  each note
          } else {
            console.warn("No notes found or failed to load notes");
            
          }

        } catch (error) {
          console.error("Error fetching notes:", error);
        }

      } else {
        alert(data.msg || "Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during login");
    }
  });
});