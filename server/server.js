const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Student@123",
    database: "college_students"
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed:", err);
    } else {
        console.log("MySQL connected successfully");
    }
});

// Get all students
app.get("/students", (req, res) => {
    db.query("SELECT * FROM students", (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
});

// Add student
app.post("/students", (req, res) => {
    const { name, roll_no, department, email } = req.body;

    db.query(
        "INSERT INTO students (name, roll_no, department, email) VALUES (?, ?, ?, ?)",
        [name, roll_no, department, email],
        (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({
                    message: "Student added successfully",
                    id: result.insertId
                });
            }
        }
    );
});

// Update student
app.put("/students/:id", (req, res) => {
    const { name, roll_no, department, email } = req.body;
    const id = req.params.id;

    db.query(
        "UPDATE students SET name=?, roll_no=?, department=?, email=? WHERE id=?",
        [name, roll_no, department, email, id],
        (err) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ message: "Student updated successfully" });
            }
        }
    );
});

// Delete student
app.delete("/students/:id", (req, res) => {
    const id = req.params.id;

    db.query(
        "DELETE FROM students WHERE id=?",
        [id],
        (err) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ message: "Student deleted successfully" });
            }
        }
    );
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});