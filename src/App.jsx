import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  function getStudents() {
    fetch("http://localhost:5000/students")
      .then(response => response.json())
      .then(data => setStudents(data));
  }

  useEffect(() => {
    getStudents();
  }, []);

  function saveStudent(e) {
    e.preventDefault();

    const student = {
      name: name,
      roll_no: rollNo,
      department: department,
      email: email
    };

    const url =
      editId === null
        ? "http://localhost:5000/students"
        : `http://localhost:5000/students/${editId}`;

    const method = editId === null ? "POST" : "PUT";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(student)
    })
      .then(() => {
        getStudents();
        clearForm();
      });
  }

  function editStudent(student) {
    setName(student.name);
    setRollNo(student.roll_no);
    setDepartment(student.department);
    setEmail(student.email);
    setEditId(student.id);
  }

  function deleteStudent(id) {
    fetch(`http://localhost:5000/students/${id}`, {
      method: "DELETE"
    }).then(() => getStudents());
  }

  function clearForm() {
    setName("");
    setRollNo("");
    setDepartment("");
    setEmail("");
    setEditId(null);
  }

  return (
    <div className="container">
      <h1>College Student Management System</h1>

      <form onSubmit={saveStudent}>
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Roll Number"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">
          {editId === null ? "Add Student" : "Update Student"}
        </button>

        {editId !== null && (
          <button type="button" onClick={clearForm}>
            Cancel
          </button>
        )}
      </form>

      <h2>Student Records</h2>

      <div className="student-list">
        {students.map(student => (
          <div className="student-card" key={student.id}>
            <h3>{student.name}</h3>
            <p><b>Roll No:</b> {student.roll_no}</p>
            <p><b>Department:</b> {student.department}</p>
            <p><b>Email:</b> {student.email}</p>

            <button onClick={() => editStudent(student)}>
              Edit
            </button>

            <button onClick={() => deleteStudent(student.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;