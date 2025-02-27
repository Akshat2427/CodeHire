const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { autoDeletion } = require('./services/autoDelete.service');
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/user", require("./routes/user.routes"));
app.use("/admin", require("./routes/admin.routes"));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});