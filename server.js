
const express = require('express');
const path = require('path');
const app = express();
const port = 3001;


app.use("/", express.static("client/build"));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});