const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const cookieParser = require('cookie-parser');

const coursesAvailableRouter = require('./routes/CoursesAvailableRouter')
const CreateClassRouter = require('./routes/CreateClassRouter')
const JoinClassRouter = require('./routes/JoinClassRoute');
const noticeRoutes = require('./routes/noticeRoutes');
const App = express();
import { GLOBAL_CONFIG } from "../components/global_config";


// Middleware
App.use(cors({
  origin: 'http://localhost:8081',
  credentials: true,
}
));

App.use(express.json());
App.use(cookieParser());


mongoose
  .connect("mongodb://127.0.0.1:27017/DB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

const conn = mongoose.connection;
conn.on("error", (err) => console.error.bind(console, "DB connection error"));
conn.once('open', () => { console.log("Connected to DataBase.") });




App.use('/coursesAvailable', coursesAvailableRouter.router);
App.use('/createClass', CreateClassRouter);
App.use('/joinClass', JoinClassRouter);

App.use('/api/notices', noticeRoutes);

const PORT = GLOBAL_CONFIG.PORT;
App.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});