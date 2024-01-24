const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { createEmployee, getData, updateData, deleteData } = require("./crud");
const { login, validate } = require("./Authenticate");
// const { hashBarrier } = require("./Authenticate");

app.use(bodyParser.json());
app.use(express.json());

app.use(cors());

app.post("/api/login", login);
app.get("/api/validate", validate);

// app.use((req, res, next) => {
//     hashBarrier != sessionStorage.getItem("authToken")
//         ? res.status(404).json({ message: "Authentication Of Token Is Not Correct" })
//         : next();
// });

app.post("/api/create", createEmployee);
app.get("/api/search", getData);
app.put("/api/update", updateData);
app.delete("/api/delete", deleteData);

app.listen(5555, () => {
    console.log("Server is running on port 5555");
});