const express = require("express");
const path = require("path");

const app = express();
console.log(" Express Server connected");

app.use(express.static(path.join(__dirname, "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 9000;

console.log(PORT);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
