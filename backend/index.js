const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { autoDeletion } = require('./services/autoDelete.service');
const cors = require('cors');
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use("/user", require("./routes/user.routes"));
app.use("/admin", require("./routes/admin.routes"));


app.post("/leetcode", async (req, res) => {
    // console.log("Request body:", req.body);
    const { username } = req.body;

    const query = {
        query: `
        {
            matchedUser(username: "${username}") {
                username
                submitStats: submitStatsGlobal {
                    acSubmissionNum {
                        difficulty
                        count
                        submissions
                    }
                }
            }
            recentSubmissionList(username: "${username}", limit: 50) {
                title
                titleSlug
            }
        }`
    };
    
    
    

    try {
        const response = await fetch("https://leetcode.com/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(query),
        });

        const data = await response.json();
        res.json(data);
        // console.log("LeetCode Data:", data.data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});