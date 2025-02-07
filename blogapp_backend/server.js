const express = require('express');
const app = express();
const Users = require('./db/models/users');
const Blogs = require('./db/models/blogs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "your-secret-key";
const cookieParser = require('cookie-parser');
const cors = require('cors');
require("./db/db_connect");
const PORT = 8000;

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:3000",
    //methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};

app.use(cors(corsOptions)); 

app.post("/registration", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const isUsername = await Users.findOne({ username: username });

        if (isUsername) {
            return res.status(409).json({ message: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = Users.create({
            username: username,
            email: email,
            password: hashedPassword
        })

        res.status(200).json({ message: "User successfully registered!" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Registration failed!" });
    }
})


app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const isUsername = await Users.findOne({ username: username });
        const isPassword = await bcrypt.compare(password, isUsername.password);
        console.log(isPassword);

        if (!isUsername && isPassword) {
            return res.status(404).json({ message: "Invalid credentials!" });
        }

        const token = jwt.sign({ id: isUsername._id }, SECRET_KEY, { expiresIn: '300000' });
        res.cookie('token', token, {httpOnly:true, maxAge: "300000"});
        res.cookie('username', isUsername.username, {httpOnly: true, maxAge: "300000"});
        res.status(200).json({ message: "Login successfull!" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Login failed!" });
    }
})


app.get("/logout", async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: "Logout successfull" })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Logout failed!" });
    }
})


const verifyToken = (req, res, next) => {
   const token = req.cookies.token;

    if (!token) {
        console.log("Token not found")
        return res.status(404).json({ message: "Access denied" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userId=decoded.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error })
    }
}




app.post("/createBlog", verifyToken, async(req, res)=>{
    const {title, paragraph} = req.body;
    const authorName = req.cookies.username;

    try {
        const newBlog = Blogs.create({
            title: title,
            paragraph: paragraph,
            username: authorName
        })

        res.status(200).json({message: "Blog created!"});
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Blog creation failed!", error: error.message});
    }
})


app.get("/getAllBlogs", verifyToken, async(req, res)=>{
    try {
        const blogs = await Blogs.find();

        res.status(200).json({message: "All blogs fetched", blogs: blogs})

    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
})

app.get("/protected", verifyToken, async(req, res)=>{
    const token = req.cookies.token;
    try {
        res.status(200).json({token: token});
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message});
    }
})





app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
})
