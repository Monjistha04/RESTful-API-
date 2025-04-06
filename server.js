const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cors());

let posts = []; // Store posts in memory

// Get all posts
app.get("/posts", (req, res) => {
    res.json(posts);
});

// Create a new post
app.post("/posts", (req, res) => {
    const { username, content } = req.body;
    if (!username || !content) {
        return res.status(400).json({ message: "Username and content are required!" });
    }

    const newPost = { id: Date.now(), username, content };
    posts.push(newPost);
    res.json(newPost);
});

// Edit a post
app.put("/posts/:id", (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    let post = posts.find((p) => p.id == id);
    if (post) {
        post.content = content;
        res.json({ message: "Post updated successfully!", post });
    } else {
        res.status(404).json({ message: "Post not found!" });
    }
});

// Delete a post
app.delete("/posts/:id", (req, res) => {
    const { id } = req.params;
    posts = posts.filter((p) => p.id != id);
    res.json({ message: "Post deleted successfully!" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
