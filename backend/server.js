const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));
const Student = mongoose.model("Student", {
    name: String,
    regno: { type: String, unique: true },
    department: String
});
app.get("/students", async (req, res) => {
    const students = await Student.find();
    res.json(students);
});
app.post("/students", async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.json(student);
    } catch (err) {
        res.status(400).json({ error: "Cannot add student. Check fields or duplicate register number." });
    }
});
app.put("/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: "after" }
        );
        res.json(student);
    } catch (err) {
        res.status(400).json({ error: "Cannot update student" });
    }
});
app.delete("/students/:id", async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: "Student deleted" });
    } catch (err) {
        res.status(400).json({ error: "Cannot delete student" });
    }
});
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});