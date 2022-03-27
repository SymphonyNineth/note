const add = document.querySelector("#add");
let currentEditingNote = null;
const notes = [];

add.addEventListener("click", saveNote);

function getText() {
  const textArea = document.querySelector("#text");
  return textArea.value;
}

function getSelectedColor() {
  const colors = document.querySelectorAll('input[name="color"]');
  let selected;
  for (const color of colors) {
    if (color.checked) {
      selected = color.value;
      break;
    }
  }
  return selected;
}

function constructNote(color, text) {
  const note = document.createElement("div");
  const index = notes.length;
  const removeBtn = document.createElement("button");
  const editBtn = document.createElement("button");
  const content = document.createElement("p");
  note.style.backgroundColor = color;
  note.id = index;
  note.classList.add("note");
  content.classList.add("note-body");
  content.innerText = text;
  removeBtn.addEventListener("click", removeNote);
  removeBtn.innerText = "Remove";
  removeBtn.setAttribute("index", index);
  removeBtn.classList.add("remove-btn");
  editBtn.setAttribute("index", index);
  editBtn.addEventListener("click", editNote);
  editBtn.innerText = "Edit";
  editBtn.classList.add("edit-btn");
  note.append(content, removeBtn, editBtn);
  return note;
}

function updateIndexes() {
  notes.forEach((note, index) => {
    const remove = note.querySelector(".remove-btn");
    const edit = note.querySelector(".edit-btn");
    remove.setAttribute("index", index);
    edit.setAttribute("index", index);
  });
}

function removeNote(e) {
  const index = e.target.getAttribute("index");
  notes.splice(index, 1);
  updateIndexes();
  if (currentEditingNote === index) currentEditingNote = null;
  render();
}

function updateSelectedColor(neededColor) {
  const colors = document.querySelectorAll('input[name="color"]');
  for (const color of colors) {
    if (color.value === neededColor) {
      color.checked = true;
    } else {
      color.checked = false;
    }
  }
}

function editNote(e) {
  const index = e.target.getAttribute("index");
  const textArea = document.querySelector("#text");
  updateSelectedColor(notes[index].style.backgroundColor);
  textArea.value = notes[index].querySelector("p").innerText;
  currentEditingNote = index;
  render();
  textArea.focus();
}

function render() {
  const noteContainer = document.querySelector("#notes");
  noteContainer.textContent = "";
  noteContainer.append(...notes);
  add.innerText = currentEditingNote ? "Save" : "Add";
}

function saveNote() {
  const textArea = document.querySelector("#text");
  const text = getText();
  const color = getSelectedColor();
  if (text.trim().length === 0) return;

  if (currentEditingNote) {
    notes[currentEditingNote].style.backgroundColor = color;
    notes[currentEditingNote].querySelector("p").innerText = text;
    currentEditingNote = null;
  } else {
    const note = constructNote(color, text);
    notes.push(note);
  }
  render();
  textArea.value = "";
}
