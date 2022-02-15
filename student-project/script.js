let studentList = 
    Boolean(localStorage.getItem("STUDENT_LIST")) 
    ? JSON.parse(localStorage.getItem("STUDENT_LIST")) 
    : [];

// IIF
(function initialRender() {
    if(studentList.lenght !== 0) {
        renderStudentsTable();
    }
})();




let target;
const submitButton = document.getElementById("add");

function getRandomId() {
    return Math.floor(Math.random() * (10000 + 1));
}

function editStudentButton(student) {
    if(validateData(student)) {

        document.getElementById("student-form").reset();
        document.getElementById("edit").style.display = "none";
        document.getElementById("add").style.display = "block";

        const index = studentList.findIndex(element => element.id == student.id);
        
        studentList[index].name = student.name;
        studentList[index].surname = student.surname;
        studentList[index].birthday = student.birthday;
        studentList[index].gender = student.gender;
        studentList[index].age = student.age;

        localStorage.setItem("STUDENT_LIST", JSON.stringify(studentList));

        renderStudentsTable();
    }
}

document.getElementById("edit").addEventListener('click', (e) => {
    e.preventDefault();

    const studentNew = {
        id: target.id,
        name: document.getElementById("name").value,
        surname: document.getElementById("surname").value,
        birthday: document.getElementById("birthday").value,
        age: document.getElementById("age").value,
        gender: document.getElementById("genderM").checked ? 'M' : 'F'
    };
    editStudentButton(studentNew);
});



function editStudentPencil(student) {
    document.getElementById("add").style.display = "none";
    document.getElementById("edit").style.display = "block";

    // DELIVER DATA TO INPUTS
    document.getElementById("name").value = student.name;
    document.getElementById("surname").value = student.surname;
    document.getElementById("birthday").value = student.birthday;
    document.getElementById("age").value = student.age;
    student.gender == 'F' ? document.getElementById("genderF").checked = true : document.getElementById("genderM").checked = true;

}

function addEventListeners() {

    studentList.map(student => {
        document.getElementById(`delete-${student.id}`).addEventListener('click', () => {
            const newStudentList = studentList.filter(element => element.id !== student.id);
            studentList = newStudentList;
            localStorage.setItem("STUDENT_LIST", JSON.stringify(studentList));
            renderStudentsTable();
        });

        document.getElementById(`edit-${student.id}`).addEventListener('click', () => {
            const targetStudent = studentList.filter(element => element.id === student.id)[0];
            target = targetStudent;
            editStudentPencil(targetStudent);
        });
    })
}

function  renderStudentsTable() {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";
    studentList.map(student => {
        tableBody.insertAdjacentHTML("beforeend", `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.surname}</td>
                <td>${student.birthday}</td>
                <td>${student.gender}</td>
                <td>${student.age}</td>
                <td>
                    <img src="./icons/delete.svg" alt="delete" id="delete-${student.id}">
                    <img src="./icons/pencil.svg" alt="edit" id="edit-${student.id}">
                </td>
            </tr>
        `)
    });
    addEventListeners();
}

function validateData(student) {
    if(Boolean(student.name) && Boolean(student.surname) && Boolean(student.age) && Boolean(student.birthday)) {
        return true
    } else {
        return false
    }
}

submitButton.addEventListener('click', (e) => {
    e.preventDefault();

    const student = {
        id: getRandomId(),
        name: document.getElementById("name").value,
        surname: document.getElementById("surname").value,
        birthday: document.getElementById("birthday").value,
        age: document.getElementById("age").value,
        gender: document.getElementById("genderM").checked ? 'M' : 'F'
    };

    if(validateData(student)) {
        document.getElementById("student-form").reset();
        studentList.push(student);
        localStorage.setItem("STUDENT_LIST", JSON.stringify(studentList));
        renderStudentsTable();
    }

});
