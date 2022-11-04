// SELECT HTML TAGS
const addStudentBtn = document.querySelector(".header__btn");
const modalWindow = document.querySelector(".modal-window");
const modalClose = document.querySelector(".close");
const modalNameInput = document.querySelector(".name-input");
const modalLastnameInput = document.querySelector(".lastname-input");
const modalMarkInput = document.querySelector(".mark-input");
const setStudentBtn = document.querySelector(".set-btn");
const table = document.querySelector(".table");
const tableWrapper = document.querySelector(".table-wrapper");
const result = document.querySelector(".count");
const resultPer = document.querySelector(".mark-num");
const elForm = document.querySelector(".main__left-form");
// EDIT MODAL SELECT
const editModalWindow = document.querySelector(".edit-modal-window");
const editModalClose = document.querySelector(".edit-close");
const editModalNameInput = document.querySelector(".edit-name-input");
const editModalLastnameInput = document.querySelector(".edit-lastname-input");
const editModalMarkInput = document.querySelector(".edit-mark-input");
const editSetStudentBtn = document.querySelector(".edit-set-btn");

// BASE URL
const BASE_URL = "http://localhost:7770"

// OPEN ADD STUDENTS WINDOW
addStudentBtn.addEventListener("click", e => {
  modalWindow.classList.remove("d-none");

})

// POST DATA

setStudentBtn.addEventListener("click", e => {
  e.preventDefault()

  const nameInput = modalNameInput.value;
  const lastnameInput = modalLastnameInput.value;
  const markInput = modalMarkInput.value;
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const fullDate = `${year}-${month}-${day}`;
  let status;
  if (markInput >= 50 && markInput <= 100) {
    status = "Pass";
  }else if (markInput >= 0 && markInput < 50) {
    status = "Fail"
  }else if (markInput === null) {
    status = "Enter the mark"
  }else {
    status = "Max mark is 100"
  }


  function postData() {
    fetch(`${BASE_URL}/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: nameInput.trim(), lastname: lastnameInput.trim(), date: fullDate, mark: markInput.trim(), status: status})
    })
  }
  postData()

  modalWindow.classList.add("d-none");
})

// GET DATA

const getData = async() => {
  const response = await fetch(`${BASE_URL}/students`);
  const data = await response.json();
  renderData(data);
}

getData()

// RENDER DATA

function renderData(data=[]) {


  data.length > 0 ? data.forEach((e) => {

    const tr = createElement(
      "tr",
      "tr",
      `
      <tr class="text-center">
      <td>${e.id}</td> <td>${e.name} ${e.lastname}</td> <td>${e.date}</td> <td>${e.mark} %</td> <td>${e.status}</td> <td>
      <button class="btn btn-warning" data-edit="${e.id}"><i class="bi bi-pencil-square"   data-edit="${e.id}" ></i></button></td>
      <td><button class="btn btn-danger" data-del="${e.id}" ><i class="bi bi-trash3-fill" data-del="${e.id}" ></i></button></td>
      </tr>
      `
      );

      tableWrapper.appendChild(tr);

  }) : table.innerHTML = "<h3 class='w-100 pt-3 alert alert-danger text-center'>Not Found</h3>"

    result.textContent = data.length;
    // resultPer.textContent = data[mark]


}

// DELETE DATA

tableWrapper.addEventListener("click", e => {
    if (e.target.classList.contains("btn-danger") || e.target.classList.contains("bi-trash3-fill")) {
      const currentId =e.target.getAttribute("data-del")

      fetch(`${BASE_URL}/students/${currentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({})
      })
    }
})


// EDIT DATA

tableWrapper.addEventListener("click", e => {
  e.preventDefault()

  if (e.target.classList.contains("btn-warning") || e.target.classList.contains("bi-pencil-square")) {
    editModalWindow.classList.remove("d-none");
    const id =e.target.getAttribute("data-edit");




  }
})


function editData(id) {
    // const id = localStorage.getItem('editID');
    const editNameInput = editModalNameInput.value;
    const editLastnameInput = editModalLastnameInput.value;
    const editMarkInput = editModalMarkInput.value;
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const fullDate = `${year}-${month}-${day}`;
    let status;
    if (editMarkInput >= 50 && editMarkInput <= 100) {
      status = "Pass";
    } else if (editMarkInput >= 0 && editMarkInput < 50) {
      status = "Fail"
    } else if (editMarkInput === null) {
      status = "Enter the mark"
    } else {
      status = "Max mark is 100"
    }

    fetch(`${BASE_URL}/students/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: editNameInput.trim(), lastname: editLastnameInput.trim(), date: fullDate, mark: editMarkInput.trim(), status: status})
    })
}


editSetStudentBtn.addEventListener("click", e => {
  hideEditModal()
  // editData(id)

})



function hideModal() {
  modalWindow.classList.add("d-none");
}

function hideEditModal() {
  editModalWindow.classList.add("d-none");
}

modalClose.addEventListener("click", e => {
  hideModal()
})

editModalClose.addEventListener("click", e => {
  hideEditModal()
})

editSetStudentBtn.addEventListener("click", e => {
  hideEditModal()
})

async function searchByName (query) {
  const response = await fetch(`${BASE_URL}/students/${query}`)
  const result = await response.json();
  renderData(result)
}
elForm.addEventListener("submit", e =>{
  const elSearch = document.querySelector(".form-search-input")
  searchByName(elSearch.value)
})