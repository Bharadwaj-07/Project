const express = require('express');
const router = express.Router();
const JoinClass = require('../models/JoinClassModel');
const Profile = require('../models/Profile');
const CourseModel = require('../models/Course');
const MarksModel = require('../models/MarksModel');
const Class = require('../models/ClassModel');

// Function to join a class
const joinClass = async (req, res) => {
    const { classId, studentId } = req.body;

    try {
        const classToJoin = await Class.findById(classId);
        classToJoin.students.push(studentId);
        await classToJoin.save();
        res.status(200).json({ message: 'Joined class successfully', class: classToJoin });
    } catch (err) {
        res.status(400).json({ message: 'Error joining class', error: err.message });
    }
}

// Route to join a class
router.post('/join', joinClass);

module.exports = router;
