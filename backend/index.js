const express = require("express");
const app =express();
const cors = require('cors')
const bodyParser = require('body-parser');
const PORT = 5000;
const studentRoutes= require('./routes/StudentRoutes')
const teacherRoutes= require('./routes/TeacherRoutes')
const adminRoutes= require('./routes/AdminRoutes')

app.use(express());
app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.json());
app.listen(PORT,()=>{
    console.log("Listening on port ",PORT);
})
app.use('/',studentRoutes);
app.use('/',teacherRoutes);
app.use('/',adminRoutes);
