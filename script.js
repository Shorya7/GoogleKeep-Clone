const addButton = document.querySelector("#add");

const updateLSData = () => {
  const textAreaData = document.querySelectorAll("textarea");
  const notes = [];

  textAreaData.forEach((note) => {
    //save in the form of array
    return notes.push(note.value);
  });
  localStorage.setItem("notes", JSON.stringify(notes)); //converting the array into string
};
const addNewNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");

  const htmlData = `
    <div class="operation">
        <button class="edit"> <i class="fas fa-edit"></i> </button>
        <button class="delete"> <i class="fas fa-trash-alt"></i> </button>
    </div>

    <div class="main ${text ? "" : "hidden"} "> </div>                
    <textarea class="${text ? "hidden" : ""}"></textarea>  `; // what is the function of $ here?

  note.insertAdjacentHTML("afterbegin", htmlData);
  const editButton = note.querySelector(".edit");
  const delButton = note.querySelector(".delete");
  const mainDiv = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  //DELETE op
  delButton.addEventListener("click", () => {
    note.remove();
    updateLSData();
  });

  // toggle using edit button
  textArea.value = text; //for the already saved data to be visible when it is in non-edit mode
  mainDiv.innerHTML = text;

  editButton.addEventListener("click", () => {
    mainDiv.classList.toggle("hidden"); //only for checking on/off
    textArea.classList.toggle("hidden");
  });

  textArea.addEventListener("change", (event) => {
    const value = event.target.value; //only to save the entered changes in the maindiv
    mainDiv.innerHTML = value;

    updateLSData();
  });

  document.body.appendChild(note);
};

// getting data back from localStorage
const notes = JSON.parse(localStorage.getItem("notes")); //parse converting the json string/text into js object(or in its original form)

if (notes) {
  notes.forEach((note) => addNewNote(note));
}

addButton.addEventListener("click", () => addNewNote());
