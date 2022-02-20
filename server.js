const express = require("express");
const fs = require('fs');
const session = require("express-session");
// const storeSessionStorage = storage.storeSessionStorage();

const {google} = require("googleapis");
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

require("dotenv").config();

// paths constants, to reduce typos
const path = require("path");
// const defaultPath = "/html/default.html";
const gamePath = "/html/index.html";
const loginPath = "/html/login.html";
const login2Path = "/html/login2.html";
const instructionsPath = "/html/instructions.html";

let emailData = null;

// sample functions only
function getRandTime() {
    let res = Math.floor(Math.random()*10);
    return res;
}
function sampleDataLoop(arr) {
    for (let i = 0; i < 160; i++) {
        arr.push(getRandTime());
    }
    return arr;
}

// middleware functions
function logger(req, res, next) {
    console.log(">Log");
    next();
}

function auth(req, res, next) {
    console.log(">Auth");
    if (req.session.emailStored) {
        next();
    } else {
        console.log(req.session.emailStored);
        res.send("No Authentication, need to login in to work!");
    }
}

express()
    .use(bodyParser.urlencoded({ extended: true }))
    .use(logger)
    .use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true
    }))
    .get("/", (req, res) => {
        // if (!req.session.emailStored) {
        //     req.session.emailStored = "none";
        // }
        console.log(">Default Page");
        console.log("Email is: "+ req.session.emailStored);
        res.redirect("/login");
    })
    .use(express.static(path.join(__dirname+'/html')))
    
    .get("/instructions", auth, (req, res) => {
        console.log(">Instructions Page");
        res.sendFile(path.join(__dirname+instructionsPath));
    })
    .get("/game", auth ,(req, res) => {
        console.log(">Game Page");
        res.sendFile(path.join(__dirname+gamePath));
    })
    
    // .get("/login/legit", auth, async (req, res) => {
    //     console.log(">Login Page");
    //     res.sendFile(path.join(__dirname+loginPath));
    //     console.log(">Email is: " + emailData);
    // })
    .get("/login", (req, res) => {
        console.log(">Login Page");
        res.sendFile(path.join(__dirname+login2Path));
        console.log(">Email is: " + req.session.emailStored);
    })
    // .post("/login/legit", async (req, res) => {

    //     let dateObj = new Date();
    //     let date = ("0" + dateObj.getDate()).slice(-2);
    //     let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    //     let year = dateObj.getFullYear();
    //     let hours = dateObj.getHours();
    //     let minutes = dateObj.getMinutes();
    //     let seconds = dateObj.getSeconds();
    //     const currDate = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

    //     const auth = new google.auth.GoogleAuth({
    //         keyFile: "google-credentials.json",
    //         scopes: "https://www.googleapis.com/auth/spreadsheets",
    //     });
    
    //     // Create client instance for auth
    //     const client = await auth.getClient();
    
    //     // Instance of Google Sheets API
    //     const googleSheets = google.sheets({ version: "v4", auth: client });
    
    //     const spreadsheetId = "18jCkI5Ut3VaO8jG7unzilpDdtB8zlnLjLtLvTqy2-io";
    
    //     // Get metadata about spreadsheet
    //     const metaData = await googleSheets.spreadsheets.get({
    //         auth,
    //         spreadsheetId,
    //     });
    
    //     // Read rows from spreadsheet
    //     const getRows = await googleSheets.spreadsheets.values.get({
    //         auth,
    //         spreadsheetId,
    //         range: "Sheet1!A:A",
    //     });
    
    //     let dataArray = [currDate, emailData];
    //     sampleDataLoop(dataArray);
    
    //     // Write row(s) to spreadsheet
    //     await googleSheets.spreadsheets.values.append({
    //         auth,
    //         spreadsheetId,
    //         range: "Sheet1!A:FF",
    //         valueInputOption: "USER_ENTERED",
    //         resource: {
    //             values: [
    //                 dataArray,
    //             ],
    //         },
    //     });
    //     res.sendFile(path.join(__dirname+login2Path));
    //     console.log("Successfully Submitted Email: "+emailData);
    // })
    .post("/login", (req, res) => {
        req.session.emailStored = req.body.user.email;
        console.log("Email is: (session)"+ req.session.emailStored);
        res.sendFile(path.join(__dirname+instructionsPath));
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));