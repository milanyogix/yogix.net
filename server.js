const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

// import modules
require('./app/config/connection');
const webRoutes = require("./routes/web");
const ashtangaRoutes = require("./routes/yoga");
const hathaRoutes = require("./routes/hatha");
const bikramRoutes = require("./routes/bikram");

// set view engine and view paths
const partialsPath = path.join(__dirname, "/resources/views");
const staticPath = path.join(__dirname, "/public");
app.use('/public', express.static(staticPath));
app.use('/auth', express.static(path.join(__dirname, "/resources/views/auth")));
app.use('/partials', express.static(partialsPath));
const viewPath = path.join(__dirname, "/resources/views");
app.set("view engine", "ejs");
app.set("views", viewPath);
// user and definebody parser
const bodyparser = require('body-parser');
app.use(bodyparser.json({ limit: '50mb' }));
app.use(bodyparser.urlencoded({ extended: true, limit: '50mb' }));

app.get("/", webRoutes);
app.get("/login", webRoutes);
app.get("/logout", webRoutes);
app.get("/signup", webRoutes);
app.post("/signup", webRoutes);
app.post("/login", webRoutes);
app.post("/subscribe", webRoutes);
app.get("/forgot-password", webRoutes);
app.post("/forgot-password", webRoutes);
app.get("/reset-password", webRoutes);
app.post("/reset-password", webRoutes);

app.get("/ashtanga", webRoutes);
app.get("/ashtangainfo", webRoutes);
app.post("/yogadata", ashtangaRoutes);
app.get("/yogadata", ashtangaRoutes);
app.get("/sessiondata", ashtangaRoutes);
app.get("/setdata", ashtangaRoutes);
app.get("/posedata", ashtangaRoutes);

// hatha routes
app.get("/hatha", webRoutes);
app.get("/hathainfo", webRoutes);
app.post("/hathayogadata", hathaRoutes);
app.get("/hathayogadata", hathaRoutes);
app.get("/hathasessiondata", hathaRoutes);
app.get("/hathasetdata", hathaRoutes);
app.get("/hathaposedata", hathaRoutes);

// bikram routes
app.get("/bikram", webRoutes);
app.get("/bikraminfo", webRoutes);
app.post("/bikramoneyogadata", bikramRoutes);
app.post("/bikramyogadata", bikramRoutes);
app.get("/bikramyogadata", bikramRoutes);
app.get("/bikramsessiondata", bikramRoutes);
app.get("/bikramsetdata", bikramRoutes);
app.get("/bikramposedata", bikramRoutes);

app.get("/dashboard", webRoutes);;
app.listen(port, () => {
    console.log(`server started on port no ${port}`);
});