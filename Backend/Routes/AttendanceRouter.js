const express = require("express");
const { getDates, getUsers, getAttendance, SetAttendance, checkAdmin, UserAttendance } = require('../Controller/AttendanceController');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Middleware to authenticate token
function AuthenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    console.log("token authentication", token);
    let Token = token.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    uname = req.uname;
    console.log(uname);
    jwt.verify(Token, process.env.ACCESS_TOKEN_SECRET, (err, uname) => {
        if (err) {
            console.log("token failed");
            return res.status(401).json({ uname: uname });
        }
        console.log("token verified");
        req.uname = uname;
        next();
    });
}

// Route to get dates
router.post("/dates", getDates);

// Route to get users
router.post("/students", getUsers);

// Route to get attendance records
router.get("/attendance", getAttendance);

// Route to check admin status
router.post("/Admin", checkAdmin);

// Route to set attendance
router.post("/attendance", SetAttendance);

// Route to get user attendance
router.post("/UserAttendance", UserAttendance);

module.exports = router;