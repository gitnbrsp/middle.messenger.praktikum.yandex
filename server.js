const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/dist"));

app.get("/getUsers", (req, res) => {
    res.status(200).sendFile(__dirname + "/static/data.json");
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});