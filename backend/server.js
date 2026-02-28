const express = require("express");
const cors = require("cors");
const chat = require("./src/chat");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const response = await chat(message);
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// app.listen(5000, () =>
//   console.log("🚀 RAG chatbot running on http://localhost:5000")
// );