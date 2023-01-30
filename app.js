const path = require("path");
const express = require("express");
const app = express();

const PORT = process.env.PORT | 4000;

const server = app.listen(PORT, () => console.log(`server on port ${PORT}`));

// making public folder into public folder
app.use(express.static(path.join(__dirname, "public")));
