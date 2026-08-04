const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // fetch() se aane wala JSON data padhne ke liye
app.use(express.static("public"));
app.set("view engine", "ejs");

// Todo ka data yahan store hota hai (har todo mein id, text, status hota hai)
let todos = [
  { id: 1, text: "Learn Express.js", status: false },
  { id: 2, text: "Learn EJS", status: false },
];
let nextId = 3;

// Home page - saare todos dikhao
app.get("/", (req, res) => {
  res.render("index", { todos });
});

// Naya todo add karo
app.post("/add", (req, res) => {
  const text = req.body.todo;
  if (text && text.trim() !== "") {
    todos.push({ id: nextId++, text: text.trim(), status: false });
  }
  res.redirect("/");
});

// Todo delete karo
app.post("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((todo) => todo.id !== id);
  res.redirect("/");
});

// API: checkbox click hone par status update karta hai
app.post("/update-status/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body; // true ya false frontend se aata hai

  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ success: false, message: "Todo not found" });
  }

  todo.status = status;
  res.json({ success: true, todo });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});