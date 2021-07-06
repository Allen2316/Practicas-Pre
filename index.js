const express = require("express");
/* mysql */
const mysql = require("mysql");
const myconn = require("express-myconnection");
const routes = require("./routes");
const routesReg = require("./routesReg");
const cors = require("cors");

const app = express();


app.use(cors());

app.set("port", process.env.PORT || 8000);
const dbCon = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1234",
    database: "NodoPrueba"
};


/* plantillas */
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");


app.use(express.static(__dirname + "/public"));

/* middleware */
app.use(myconn(mysql, dbCon, "single"));
app.use(express.json());

/* routes */
app.get("/", (req, res) => {
    res.render("index");
});

app.use("/", routesReg);
app.use("/api", routes);

/* Server run */
app.listen(app.get("port"), () => {
    console.log("Server running on port", app.get("port"));
});




