require("./db/db_connect");
require('dotenv').config();
const Users = require("./db/models/users");
const Blogs = require("./db/models/blogs");
const Comments = require("./db/models/comments");
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT || 8000;
const SECRET_KEY = process.env.SECRET_KEY;

var http = require("http");

const verifyToken = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    console.log("Token not found");
    res.writeHead(403, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Access denied" }));
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log("JWT verification error:", error.message);
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Token expired or invalid" }));
  }
};

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const unprotectedRoutes = ["/registration", "/login"];

  const handleRequest = async () => {
    if (req.url === "/registration" && req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", async () => {
        try {
          const data = JSON.parse(body);
          const username = await Users.findOne({ username: data.username });
          if (username) {
            res.writeHead(409, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "User already Exists!" }));
            return;
          }
          await Users.create(data);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "User Registered Successfully!" }));
        } catch (error) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              message: "Registration Failed",
              error: error.message,
            })
          );
        }
      });
    }
    
    else if (req.url === "/login" && req.method === "POST") {
      console.log("login")
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", async () => {
        try {
          const data = JSON.parse(body);
          const user = await Users.findOne({
            username: data.username,
            password: data.password,
          });
          if (!user) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Invalid Credentials!" }));
            return;
          }
          const token = jwt.sign({ id: user._id }, SECRET_KEY, {
            expiresIn: "30m",
          });
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              message: "Login Successful!",
              data: {
                token: token,
                username: user.username,
              },
            })
          );
        } catch (error) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              message: "Server error occurred!",
              error: error.message,
            })
          );
        }
      });
    } 
    
    else if (req.url === "/createBlog" && req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      try {
        req.on("end", async () => {
          const data = JSON.parse(body);
          
          const existingBlog = await Blogs.findOne({_id: data._id});
          
          if(existingBlog){
            await Blogs.findByIdAndUpdate(data._id, data, {new: true});
          }

          else{
            await Blogs.create(data);  
          }

          res.statusCode = 200;
          res.end("Blog created successfully");
        });
      } catch (error) {
        console.log(error);
        res.statusCode = 500;
        res.end("Error creating blog");
      }
    } 
    
    else if (req.url === "/getAllBlogs" && req.method === "GET") {
      try {
        const blogs = await Blogs.find();

        const blogData = blogs.map((blog) => {
          const image = blog.image ? blog.image.toString("base64") : null;
          return {
            _id: blog._id,
            title: blog.title,
            paragraph: blog.paragraph,
            username: blog.username,
            image: image,
            imageType: blog.imageType,
          };
        });

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(blogData));

      } catch (error) {
        console.error("Error fetching blogs:", error);

        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Error fetching blogs" }));
      }

    } 

    else if(req.url === "/getSingleBlog" && req.method === 'POST'){
      let body='';
      
      req.on('data', (chunk)=> body+=chunk);

      try {
        req.on('end', async()=>{
          const data = JSON.parse(body);
          const blog = await Blogs.findOne({_id: data});

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(blog));
        })
     
      } catch (error) {
        console.log(error);
        res.statusCode = 500;
        res.end("Error fetching blog");
      }
    }

    
    else if (req.url === "/myBlogs" && req.method === "POST") {
      console.log("myblog");
      let body = "";
      req.on("data", (chunk) => (body += chunk));

      try {
        req.on("end", async () => {
          const blogs = await Blogs.find({ username: JSON.parse(body) });

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(blogs));
        });
      } catch (error) {
        console.log(error);
        res.statusCode = 500;
        res.end("Error fetching blogs");
      }
    } 
    
    else if (req.url === "/deleteBlog" && req.method === "POST") {
      let body = "";

      req.on("data", (chunk) => (body += chunk));

      try {
        req.on("end", async () => {
          const result = await Blogs.deleteOne({ _id: JSON.parse(body) });

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify("Blog Deleted!"));
        });
      } catch (error) {
        console.log(error);
        res.statusCode = 400;
        res.end(JSON.stringify(error));
      }
    } 

    else if(req.url === "/createComment" && req.method === "POST"){
      let body='';
      req.on('data', (chunk)=> body+=chunk);
        
      try {
        req.on('end', async()=>{
          const data = JSON.parse(body); 

          const existingComment = await Comments.findOne({_id: data._id});

          if(existingComment){
            await Comments.findByIdAndUpdate(data._id, data, {new: true});
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify("Comment Edited!"));
          }
          else{
            await Comments.create(data);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify("Comment Created!"));
          }
        })
      } catch (error) {
        console.log(error);
        res.statusCode = 400;
        res.end(JSON.stringify(error));
      }

    }
   
    else if (req.url === '/getAllComments' && req.method === 'POST'){
      let body='';

      req.on('data', (chunk) => body+=chunk);

      try {
        req.on('end', async()=>{
          const id = JSON.parse(body);
          const result = await Comments.find({BlogId: id});
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(result));
        })

      } catch (error) {
        console.log(error);
        res.statusCode = 400;
        res.end(JSON.stringify(error));
      }
    }

    else if(req.url === '/deleteComment' && req.method === 'POST'){
      let body = '';
      req.on('data', (chunk) => body += chunk);

      try {
        req.on('end', async() => {
          const commentId = JSON.parse(body);
          await Comments.deleteOne({_id: commentId});
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify("Comment Deleted!"));
        })
        
      } catch (error) {
        console.log(error);
        res.statusCode = 400;
        res.end(JSON.stringify(error));
      }
    }

    
    else if (req.url === "/protected" && req.method === "POST") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User Valid" }));
    }
  };



  if (unprotectedRoutes.includes(req.url)) {
    handleRequest();
  } else {
    verifyToken(req, res, handleRequest);
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
