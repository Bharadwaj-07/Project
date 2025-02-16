// Importing required modules
const express = require('express');
const Notice = require('../models/NoticeModel');

const router = express.Router();

// Function to create a new notice
const createNotice = async (req, res) => {
    const { title, description } = req.body;

    try {
        const newNotice = new Notice({ title, description });
        await newNotice.save();
        res.status(201).json({ message: 'Notice created successfully', notice: newNotice });
    } catch (err) {
        res.status(400).json({ message: 'Error creating notice', error: err.message });
    }
}

// Route to create a new notice
router.post('/', createNotice);

// Route to fetch all notices
router.get('/', async (req, res) => {
    try {
        const notices = await Notice.find();
        res.status(200).json(notices);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching notices', error: err.message });
    }
});

module.exports = router;
