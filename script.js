const postsContainer = document.getElementById("posts");

// Fetch and display posts
function fetchPosts() {
    fetch("/posts")
        .then(res => res.json())
        .then(posts => {
            postsContainer.innerHTML = "";
            posts.forEach(post => {
                const postElement = document.createElement("div");
                postElement.classList.add("post");
                postElement.innerHTML = `
                    <strong>${post.username}:</strong> ${post.content}
                    <button onclick="editPost(${post.id})">Edit</button>
                    <button onclick="deletePost(${post.id})">Delete</button>
                `;
                postsContainer.appendChild(postElement);
            });
        });
}

// Add new post
function addPost() {
    const username = document.getElementById("username").value;
    const content = document.getElementById("content").value;

    if (!username || !content) {
        alert("Username and post content are required!");
        return;
    }

    fetch("/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, content })
    })
    .then(res => res.json())
    .then(() => {
        alert("Post added!");
        fetchPosts();
        document.getElementById("content").value = "";
    });
}

// Edit post
function editPost(id) {
    const newContent = prompt("Edit your post:");
    if (!newContent) return;

    fetch(`/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newContent })
    })
    .then(res => res.json())
    .then(() => {
        alert("Post updated!");
        fetchPosts();
    });
}

// Delete post
function deletePost(id) {
    if (confirm("Are you sure you want to delete this post?")) {
        fetch(`/posts/${id}`, { method: "DELETE" })
        .then(res => res.json())
        .then(() => {
            alert("Post deleted!");
            fetchPosts();
        });
    }
}

// Load posts when page loads
fetchPosts();
