
const express = require('express');
const app = express();

app.use(express.json());


let students = [];

// TASK 2: CREATE STUDENT
app.post('/api/students', (req, res) => {

    if (!req.body) {
        return res.status(400).json({
            message: "Request body is required"
        });
    }

    const { id, name, email, course, age } = req.body;

    if (id == null || !name || !email || !course ||
        age == null || age === '') {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    if (students.some(student => student.id == id)) {
        return res.status(409).json({
            message: "Student ID already exists"
        });
    }

    const student = { id, name, email, course, age };

    students.push(student);

    res.status(201).json({
        message: "Student created successfully",
        student: student
    });
});


// TASK 3: GET ALL STUDENTS
app.get('/api/students', (req, res) => {

    res.status(200).json({
        message: "All student records",
        students: students
    });
});


// TASK 3: GET STUDENT BY ID
app.get('/api/students/:id', (req, res) => {

    const id = req.params.id;

    const student = students.find(
        student => String(student.id) === id
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.status(200).json({
        message: "Student found",
        student: student
    });
});


// TASK 4: UPDATE STUDENT (PUT)
app.put('/api/students/:id', (req, res) => {

    const id = req.params.id;

    const index = students.findIndex(
        student => String(student.id) === id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "Updated data is required"
        });
    }

    
    students[index] = {
        ...students[index],
        ...req.body,
        id: students[index].id
    };

    res.status(200).json({
        message: "Student updated successfully",
        student: students[index]
    });
});


// TASK 5: DELETE STUDENT
app.delete('/api/students/:id', (req, res) => {

    const id = req.params.id;

    const index = students.findIndex(
        student => String(student.id) === id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    
    students.splice(index, 1);

    res.status(200).json({
        message: "Student deleted successfully"
    });
});



const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
