// const express = require("express");
// const router = express.Router();

// const {google} = require("googleapis");

// const path = require("path");

// const store = require("./store");
// // const fetchEmailData = store.fetchEmailData;
// var emailData = store.emailData;

// const loginPath = "/login.html";
// const login2Path = "/login2.html";
// const defaultPath = "/default.html";


// function getRandTime() {
//     let res = Math.floor(Math.random()*10);
//     return res;
// }

// function sampleDataLoop(arr) {
//     for (let i = 0; i < 160; i++) {
//         arr.push(getRandTime());
//     }
//     return arr;
// }

// function auth(req, res, next) {
//     console.log(">Auth");
//     if (emailData !== "blank@blank.com") {
//         console.log(emailData);
//         next();
//     } else {
//         res.send("No Authentication, need to login in http://localhost:1337/login2 to work");
//     }
// }

// router.get("/legit", auth, async (req, res) => {
//     console.log(">Login Page");
//     res.sendFile(path.join(__dirname+loginPath));
//     // console.log(">Email is: " + emailData);
// });

// router.get("/", async (req, res) => {
//     console.log(">Login Page");
//     res.sendFile(path.join(__dirname+login2Path));
//     // console.log(">Email is: " + emailData);
// });

// router.post("/legit", async (req, res) => {
//     // const email = req.body.user.email;
//     let dateObj = new Date();
//     let date = ("0" + dateObj.getDate()).slice(-2);
//     let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
//     let year = dateObj.getFullYear();
//     let hours = dateObj.getHours();
//     let minutes = dateObj.getMinutes();
//     let seconds = dateObj.getSeconds();
//     const currDate = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

//     const auth = new google.auth.GoogleAuth({
//         keyFile: "credentials.json",
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
//     res.sendFile(path.join(__dirname+defaultPath));
//     console.log("Successfully Submitted Email: "+emailData);
// });

// router.post("/", (req, res) => {
//     // emailData = req.body.user.email;
//     store.setEmailData(req.body.user.email);
//     console.log("Email is: "+ store.getEmailData);
//     // alert(email);
//     res.sendFile(path.join(__dirname+defaultPath));
// });

// module.exports = router;